const authenticateUtil = require('../utils/authenticate.js');
userRouter.post('/signin', controller.signin);

userRouter.post('/signup', controller.signup);

module.exports = async (req, res, next) => {
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

}

