# Submit a request via cURL:
# 	curl -X POST -F audio=@salli.wav 'http://localhost:5000/predict'
# import the necessary packages
# -*- coding: utf-8 -*-
import sugartensor as tf
import numpy as np
import librosa
from model import *
import data
import flask
import io
from datetime import datetime
from werkzeug import secure_filename
import os

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
model = None

def init_model():
    global x, y
    # set log level to debug
    tf.sg_verbosity(10)
    #
    # hyper parameters
    #
    batch_size = 1  # batch size
    #
    # inputs
    #
    # vocabulary size
    voca_size = data.voca_size
    # print(voca_size)
    # mfcc feature of audio
    x = tf.placeholder(dtype=tf.sg_floatx, shape=(batch_size, None, 20))
    # sequence length except zero-padding
    seq_len = tf.not_equal(x.sg_sum(axis=2), 0.).sg_int().sg_sum(axis=1)
    # encode audio feature
    logit = get_logit(x, voca_size=voca_size)
    # ctc decoding
    decoded, _ = tf.nn.ctc_beam_search_decoder(logit.sg_transpose(perm=[1, 0, 2]), seq_len, merge_repeated=False)
    # to dense tensor
    y = tf.sparse_to_dense(decoded[0].indices, decoded[0].dense_shape, decoded[0].values) + 1
          
def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global model, sess
    init_model()
    # run network
    sess = tf.Session()
    # init variables
    tf.sg_init(sess)

    # restore parameters
    saver = tf.train.Saver()
    model = saver.restore(sess, tf.train.latest_checkpoint('wavenet_train'))    


@app.route("/predict", methods=["POST"])
def predict():
    # initialize the data dictionary that will be returned from the
    # view
    result = {"success": False}
    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        # initialize the data dictionary that will be returned from the
        # view
        # load wave file
        f = flask.request.files["audio"]
        #wav, _ = sf.read(io.BytesIO(file))
        filename = datetime.now().strftime("%Y%m%d-%H%M%S") + ".wav"
        # file = "./audioSamples/salli.wav"     
        
        f.save(secure_filename(filename))
        wav, _ = librosa.load(filename, mono=True, sr=16000)
        # get mfcc feature
        mfcc = np.transpose(np.expand_dims(librosa.feature.mfcc(wav, 16000), axis=0), [0, 2, 1])
        # run session
        label = sess.run(y, feed_dict={x: mfcc})
        result["predictions"] = []
        # print label
        r = data.print_index(label)
        for index_list in label:
            preds = data.index2str(index_list)
        result["predictions"].append(preds)
        # indicate that the request was a success
        result["success"] = True
        os.remove(filename)
    # return the data dictionary as a JSON response
    return flask.jsonify(result)


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
    print(("* Loading wavenet model and Flask starting server..."
           "please wait until server has fully started"))
    load_model()
    app.run(host='0.0.0.0', port=7012)
