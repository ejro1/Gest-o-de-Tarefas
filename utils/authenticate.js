    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');

    let secret = process.env.JWT_SECRET;


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
