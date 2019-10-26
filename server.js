var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// get connected arduino
SerialPort.list((err, ports) => {
  ports.forEach(port => {
    pm = port['manufacturer'];
    if (typeof pm !== 'undefined' && pm.includes('arduino')) {
      let socket;
      var arduino = new SerialPort(port.comName.toString(), { autoOpen: false, baudRate: 9600 });
      const parser = new Readline({ delimiter: '\r\n' });
      arduino.pipe(parser);
      parser.on('data', line => {
        if (socket) {
          socket.emit('message', line.toString() + '\n');
        }
      });

      arduino.open(err => {
        if (err) {
          return console.log('Error opening port: ', err.message);
        } else {
          console.log('Communication serie Arduino 9600 bauds : Ok');
        }
      });

      io.on('connection', sock => {
        socket = sock;
        socket.emit('message', 'Connexion : Ok');
        socket.on('message', msg => {
          arduino.write(msg.toString(), err => {
            if (err) {
              io.emit('message', err.message);
              console.log('Error: ', err.message);
            }
          });
        });
      });

      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/power1.html');
      });

      http.listen(3030, () => {
        console.log('listening on *:3030');
      });
    }
  });
});
