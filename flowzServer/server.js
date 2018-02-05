var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const fileUpload = require('express-fileupload');
const r = require('rethinkdbdash')();
var cors = require('cors');
var json2xls = require('json2xls');

app.use(bodyParser.json());
// use it before all route definitions
app.use(cors({origin: '*'}));
app.use(fileUpload())
app.use(json2xls.middleware);
app.use(express.static('public'))

app.post('/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    console.log('filename:/public/'+req.files.file.name)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv("public/"+req.files.file.name, function(err) {
      if (err)
        return res.status(500).send(err);
  
      // res.send('File uploaded!');
      r.db("PDF_Extract").table('pdflist').insert({'fileName':req.files.file.name, 'created_at': new Date().toJSON()}).run().then(result => {
        res.send('File uploaded!');
      }).catch(err => {
        console.log('Error:', err)
      })
    });
  });

app.get('/getFileList', function (req, res) {
  r.db("PDF_Extract").table("pdflist").orderBy('created_at').run().then(result => {
    res.send(result)
  }).catch(err => {
    console.log("Error:", err)
  })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
