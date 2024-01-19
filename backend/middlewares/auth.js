const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    // Se a requisição for um OPTIONS, responda com os cabeçalhos CORS adequados
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }

    const accessToken = req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).send("Não autorizado");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];

        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        req.body.loggedUserName = result.Name;
        return next();
    } catch (err) {
        console.error('Erro de autenticação:', err);
        return res.status(401).send("Não autorizado");
    }
};
