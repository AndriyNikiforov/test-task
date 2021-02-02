const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const Routers = require('./src/routers');

const app = express();
let { NODE_PORT, NODE_ENV } = process.env;
NODE_PORT = (NODE_ENV === 'test') ? 3007 : NODE_PORT;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/api/', Routers);

app.get('/', (req, res) => res.json({
  message: 'Hello world',
}));

app.use((req, res) => {
  res.status(404).json({
    error: 404,
  });
});

app.listen(NODE_PORT, () => console.log(`http://localhost:${NODE_PORT}/`));

module.exports = app;
