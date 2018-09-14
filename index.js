const express = require('express');
const app = express();

const { port } = require('./config/environment');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.send('<h1>Hello world!</h1>'));

app.listen(port, () => console.log(`Express is running on port ${port}`));
