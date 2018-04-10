# import the necessary packages
from gensim.models import KeyedVectors
import flask
import io

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
model = None

def load_model():
    # load the pre-trained word2vec model (here we are using a model
    # pre-trained)
    global model
    filename = 'glove.6B.100d.txt.word2vec'
    model = KeyedVectors.load_word2vec_format(filename, binary=False)
    
@app.route("/predict_most_similar", methods=["POST"])
def predict_most_similar():
    # initialize the data dictionary that will be returned from the
    # view
    data = {"success": False}
    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        text_label1 = flask.request.form['label1']
        processed_label1 = text_label1.lower()
        print(processed_label1)
        text_label2 = flask.request.form['label2']
        processed_label2 = text_label2.lower()
        print(processed_label2)
        text_label3 = flask.request.form['label3']
        processed_label3 = text_label3.lower()
        print(processed_label3)
        data["predictions"] = []
        preds = model.most_similar_cosmul(positive=[text_label3, text_label2], negative=[text_label1], topn=1)
        # indicate that the request was a success
        data["success"] = True
        data["predictions"].append(preds)
        # return the data dictionary as a JSON response
    return flask.jsonify(data)
    
@app.route("/predict_doesnt_match", methods=["POST"])
def predict_doesnt_match():
    # initialize the data dictionary that will be returned from the
    # view
    result = {"success": False}
    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        text_label4 = flask.request.form['label4']
        processed_label4 = text_label4.lower() #"breakfast cereal dinner lunch"
        print(processed_label4)
        result["predictions"] = []
        pred = model.doesnt_match(processed_label4.split())
        # indicate that the request was a success
        result["success"] = True
        result["predictions"].append(pred)
    return flask.jsonify(result)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
        "please wait until server has fully started"))
    load_model()
    app.run(host='0.0.0.0', port=7011)
