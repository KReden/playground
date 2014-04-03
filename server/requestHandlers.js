/**
 * Created by kylereden on 4/2/14.
 */

var exec            = require('child_process').exec
  , queryString   = require('querystring')
  , fs            = require('fs')
  , formidable    = require('formidable');

function start(response){
  console.log('start request');

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();


//    exec('ls -lah', function(error, stdout, stderr){
//        response.writeHead(200, {"Content-Type": "text/plain"});
//        response.write(stdout);
//        response.end();
//    });
}

function show(response){
  console.log('show request');
  response.writeHead(200, {"Content-Type": "img/png"});
  fs.createReadStream('app/assets/img/test.png').pipe(response);
}

function upload(response, request){
  console.log('upload request');

  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function(error, fields, files){
    console.log('parse done');

    /* Windows blows */
//    if(files.upload){
      fs.rename(files.upload.path, "app/assets/img/test.png", function(error){
        if(error){
          fs.unlink('app/assets/img/test.png');
          fs.rename(files.upload.path, 'app/assets/img/test.png');
        }
      });
//    }

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('recieved image <br/>');
    response.write("<img src='/show' />");
    response.end();
  });
}

exports.start   = start;
exports.upload  = upload;
exports.show    = show;