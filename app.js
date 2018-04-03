const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser')

var predfileName = null;

// Set Storage Engine 
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        predfileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, predfileName);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, callback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    //console.log(predfileName);
    if (mimetype && extname) {
        return callback(null, true);
    } else {
        callback('Error: Images Only!');
    }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

// Body Parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/', (req, res) => res.render('start'));
app.get('/ResNet50', (req, res) => res.render('ResNet50'));
app.post('/ResNet50/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('ResNet50', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('ResNet50', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('ResNet50', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});




var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

app.get('/ResNet50/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('ResNet50', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

// initialize the Keras REST API endpoint URL along with the input
// image path

app.post('/ResNet50/predict', (req, res) => {
    //console.log("./public/uploads/" + predfileName);
    // var formData = {
    //     "image": image,
    //     image: fs.readFileSync("./public/uploads/" + predfileName)
    // };
    const ImgfileName = "./public/uploads/" + predfileName;
    var image = fs.createReadStream(ImgfileName);
    var payload = { "image": image }
    // var data = fs.readFileSync("./public/uploads/"+predfileName);
    // console.log(data);
    var KERAS_REST_API_URL = "http://129.59.107.65:7778/predict"
    var imagePath = "../uploads/" + predfileName
    var str = null
    var r = request.post(KERAS_REST_API_URL, function optionalCallback(err, httpResponse, body) {
        if (err) {
            res.render('ResNet50', {
                msg: 'Prediction Failed!',
            });
            return console.error('Prediction failed:', err);
        }

        var bodyjson = JSON.parse(body);
        str = bodyjson['predictions'];
        // console.log(str)
        res.render('ResNet50', {
            msg: 'File Predicted!',
            file: imagePath,
            str: str
        });
        for (i in bodyjson['predictions']) {
            console.log(bodyjson['predictions'][i].label + " : " + bodyjson['predictions'][i].probability);
        }
    });

    var form = r.form();
    form.append('image', image, { filename: 'image' });
    console.log(imagePath);

});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
