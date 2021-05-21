import http from 'http';
import fs from 'fs';
import WebSocketsGo from './websockets.mjs';
import RadioListener from './radio-listener.mjs';

const server = http.createServer((req, res) => {
  fs.readFile(`./${req.url}`, (err, data) => {
    if (err) {
      fs.readFile('./public/index.html', (err, data) => {
        if (err) {
          console.log('err');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data.toString());
        return;
      });
    } else {
      res.setHeader('Content-Type', 'text/javascript');
      res.statusCode = 200;
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('listening on 3000 port')
});

RadioListener();
WebSocketsGo();