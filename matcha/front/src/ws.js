var ws = new WebSocket('ws://localhost:3002');

ws.onopen = (event) => {
  ws.send('Salut');
};

ws.onmessage = (msg) => {
  ws.send('Receive msg');
};

ws.onclose = (event) => {
  ws.send('Close connection');
};
