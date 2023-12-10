const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) {
    console.error('La variable de entorno JWT_SECRET no está configurada.');
}

exports.generateAccessToken = information => jwt.sign(information, secret, { expiresIn: '7d' });

exports.certifyAccessToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error('Error de verificación de token:', err.name, err.message);
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
