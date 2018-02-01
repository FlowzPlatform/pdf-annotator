var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
const r = require('rethinkdbdash')()

app.use(fileUpload())
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
      r.db("PDF_Extract").table('pdfList').insert({'fileName':req.files.file.name}).run().then(result => {
        res.send('File uploaded!');
      }).catch(err => {
        console.log('Error:', err)
      })
    });
  });

app.get('/getFileList', function (req, res) {
  r.db("PDF_Extract").table("pdfList").run().then(result => {
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
