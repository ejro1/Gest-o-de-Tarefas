require('dotenv').config();console.log('Variables de entorno cargadas:', process.env);



const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const router = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/', router);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});