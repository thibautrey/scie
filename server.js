var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let socket;
var usbserial = '/dev/cu.usbmodem14201';
var arduino = new SerialPort(usbserial, { autoOpen: false, baudRate: 9600 });
const parser = new Readline();
arduino.pipe(parser);
parser.on('data', line => socket.emit('message', line));

arduino.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  } else {
    console.log('Communication serie Arduino 9600 bauds : Ok');
  }
});

io.on('connection', function (sock) {
  socket = sock;
  socket.emit('message', 'Connexion : Ok');
  socket.on('message', function (msg) {
    arduino.write(msg + '\n', function (err) {
      if (err) {
        io.emit('message', err.message);
        console.log('Error: ', err.message);
      }
    });
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/power1.html');
});

http.listen(3030, function () {
  console.log('listening on *:3000');
});
