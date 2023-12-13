require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const router = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/', router);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
