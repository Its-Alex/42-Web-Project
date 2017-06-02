var ws = new WebSocket('ws://localhost:3002');

ws.onopen = (event) => {
  ws.send('Salut');
};
