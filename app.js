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

//Xception
app.get('/', (req, res) => res.render('start'));
app.get('/Xception', (req, res) => res.render('Xception'));
app.post('/Xception/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('Xception', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('Xception', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('Xception', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//VGG16
app.get('/', (req, res) => res.render('start'));
app.get('/VGG16', (req, res) => res.render('VGG16'));
app.post('/VGG16/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('VGG16', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('VGG16', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('VGG16', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//VGG19
app.get('/', (req, res) => res.render('start'));
app.get('/VGG19', (req, res) => res.render('VGG19'));
app.post('/VGG19/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('VGG19', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('VGG19', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('VGG19', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//Resnet50
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

//InceptionV3
app.get('/', (req, res) => res.render('start'));
app.get('/InceptionV3', (req, res) => res.render('InceptionV3'));
app.post('/InceptionV3/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('InceptionV3', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('InceptionV3', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('InceptionV3', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//InceptionResNetV2
app.get('/', (req, res) => res.render('start'));
app.get('/InceptionResNetV2', (req, res) => res.render('InceptionResNetV2'));
app.post('/InceptionResNetV2/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('InceptionResNetV2', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('InceptionResNetV2', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('InceptionResNetV2', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//MobileNet
app.get('/', (req, res) => res.render('start'));
app.get('/MobileNet', (req, res) => res.render('MobileNet'));
app.post('/ResNetMobileNet50/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('MobileNet', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('MobileNet', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('MobileNet', {
                    msg: 'File Uploaded!',
                    file: `../uploads/${req.file.filename}`
                });
            }
        }
    });
});

//DenseNet
app.get('/', (req, res) => res.render('start'));
app.get('/DenseNet', (req, res) => res.render('DenseNet'));
app.post('/DenseNet/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('DenseNet', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('DenseNet', {
                    msg: 'Error: No File to be Uploaded!'
                });
            } else {
                res.render('DenseNet', {
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

//Xception
app.get('/Xception/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('Xception', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//VGG16
app.get('/VGG16/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('VGG16', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//VGG19
app.get('/VGG19/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('VGG19', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//Resnet50
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

//InceptionV3
app.get('/InceptionV3/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('InceptionV3', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//InceptionResNetV2
app.get('/InceptionResNetV2/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('InceptionResNetV2', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//MobileNet
app.get('/MobileNet/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('MobileNet', {
            msg: 'File Downloaded!',
            file: fullimgPath
        });
        console.log('done');
    });
});

//DenseNet
app.get('/DenseNet/download', (req, res) => {
    console.log("Downloading..");
    console.log(req.query.urlname);
    var url = req.query.urlname;
    var downloadLocation = './public/uploads/';
    predfileName = 'myImage-' + Date.now() + ".jpg";
    var fullimgPath = '../uploads/' + predfileName; 
    console.log(fullimgPath);
    download(url, downloadLocation + predfileName, function () {
        res.render('DenseNet', {
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
