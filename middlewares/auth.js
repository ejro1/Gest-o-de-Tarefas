const authenticateUtil = require('../utils/authenticate.js');

console.log('Middleware de autenticación iniciado');

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
        console.log('Token no proporcionado. Unauthorized.');
        return res.status(401).send("Unauthorized");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];

        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        req.body.loggedUserName = result.Name;

        console.log('Autenticación exitosa.');
        return next();
    } catch (err) {
        console.error('Error de autenticación:', err);
        return res.status(401).send("Unauthorized");
    }
}