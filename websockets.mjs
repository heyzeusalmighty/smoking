import WebSocket from 'ws';
import data from './log-data.mjs';

let wsInstance;

const messageHandler = msg => {
  // console.log('ws message', msg);
  switch (msg) {
    case 'get_last_24':
      return JSON.stringify(data.getLast24Hours());

    default:
      return 'Cool';
  }
}

const startWebsockets = () => {
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', (ws) => {
    wsInstance = ws;

    

    ws.on('message', message => {
      const newMsg = messageHandler(message);
      ws.send(newMsg);
    });
  
    // ws.send('something');
  });
}

export const newTemperatureReading = (value) => {
  wsInstance?.send(JSON.stringify(value));
};


export default startWebsockets;