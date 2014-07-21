var five = require("johnny-five"),
  board, led,  photoresistor, sensor;
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);
var exec = require('child_process').exec;
readline = require("readline");

board = new five.Board();

board.on("ready", function() {

// Setup

  var servoValue = 0;
  var servo = new five.Servo(process.argv[2] || 10);
  led = new five.Led(11);



  photoresistor = new five.Sensor({
    pin: "A3",
    freq: 300
  });

  board.repl.inject({
    pot: photoresistor
  });

  led.off();

  var servoValue = 0;
  var proc = 0;


  photoresistor.on("data", function(data) {
    var value = this.value;
    if (value > 165) { 
      if (servoValue > 175){
        servoValue = 0;
      }
      var send = servoValue + 45;
      servoValue = send;
      servo.to(send);
      if (servoValue > 175){
        servoValue = 0;
      }
    } 
    proc = value
  console.log(this.value);

  });

});




