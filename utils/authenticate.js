    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');

    let secret = process.env.JWT_SECRET;

    if (!secret) {
        secret = crypto.randomBytes(64).toString('hex');
        console.log('Variável de ambiente JWT_SECRET não configurada. Gerando uma chave aleatória.');
        console.log('Chave gerada:', secret);
        process.env.JWT_SECRET = secret;
    }

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
