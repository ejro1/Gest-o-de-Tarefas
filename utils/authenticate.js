const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const secret = process.env.JWT_SECRET;
    

    exports.generateAccessToken = information => jwt.sign(information, secret, { expiresIn: '7d' });

    exports.certifyAccessToken = token => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.error('Erro na verificação do token:', err.name, err.message);
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
