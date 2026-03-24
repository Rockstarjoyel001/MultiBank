const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');

const app = express();
app.use(cors());

let tickers = [
  { symbol: 'BTC-USD', price: 40000 },
  { symbol: 'ETH-USD', price: 2000 },
  { symbol: 'AAPL', price: 150 }
];

app.get('/tickers', (req, res) => res.json(tickers));

app.get('/history', (req, res) => {
  const data = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    price: 100 + Math.random() * 50
  }));
  res.json(data);
});

const server = app.listen(3001);
const wss = new WebSocketServer({ server });

setInterval(() => {
  tickers = tickers.map(t => ({
    ...t,
    price: t.price + (Math.random() - 0.5) * 100
  }));
  const msg = JSON.stringify(tickers);
  wss.clients.forEach(c => c.readyState === 1 && c.send(msg));
}, 2000);
