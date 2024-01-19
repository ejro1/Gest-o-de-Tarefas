const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    // Configurar cabeçalhos CORS
    res.header('Access-Control-Allow-Origin', '*'); // Troque '*' pelo domínio específico do seu frontend se estiver em produção.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); 

    // Se a requisição for um OPTIONS, responda com status 200
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Verificar token de autorização
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
