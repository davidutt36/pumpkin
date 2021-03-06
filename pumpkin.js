var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var GPIO = require('onoff').Gpio;
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

led = new GPIO(17, 'out');



app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at '+url+':'+port);


io.sockets.on('connection', function (socket) {
port.open(function(error) {
  if (error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('Serial open');
    port.on('data', function(data) {
    //console.log('data length: ' + data.length);
    console.log((data));
    light(data[5]);
    });
}  
});

function light(pum) {

  var pum = parseInt(pum);
  console.log(pum);

    if(pum < 4) {
      console.log("Jack O Lantern is lit!");
      led.writeSync(1);
      //$("body").css("background-color","black");


    } else {
      console.log("Jack O Lantern is off.");
      led.writeSync(0);
      //$("body").css("background-color","#7ec0ee");

    }
  }

function run(){
  light();
}

});
  



