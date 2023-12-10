const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../utils/authenticate.js');
const { PrismaClient } = require('../prisma/generated/client/index.js');
const prisma = new PrismaClient();

// Entrar com um Usuario
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        })

        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name, isAdmin : user.isAdmin });
                res.status(200).json({ name: user.name, token: accessToken });
            }
        }

    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

// Registar um Usuario
exports.signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin
            },
        });

        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            const accessToken = authenticateUtil.generateAccessToken({
                id: user.id,
                name: user.name,
                isAdmin: user.isAdmin
            });
            res.status(200).json({ name: user.name, token: accessToken });
        } else {
    
            res.status(401).json({ msg: 'Erro na autenticação do usuário recém-criado.' });
        }
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
}

// Obter todos os usuarios
exports.getAllUsers = async (req, res) => {
    try {
    
        const users = await prisma.users.findMany();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao obter usuarios', error: error.message });
    }
}
// Actualizar perfil do usuario 
exports.updateProfile = async (req, res) => {
    const { id } = req.params; 
    const { name, email, password, isAdmin } = req.body;

    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                email,
                password: password ? bcrypt.hashSync(password, 8) : undefined,
                isAdmin,
            },
        });

        const { password: omitPassword, ...userWithoutPassword } = updatedUser;

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao actualizar o perfil' });
    }
};
// Apagar um usuario 
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.users.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.status(200).send('Usuario eliminado com sucesso');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao eliminar o usuario' });
    }
};