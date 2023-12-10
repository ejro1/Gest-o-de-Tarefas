const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../utils/authenticate.js');
const { PrismaClient } = require('../prisma/generated/client/index.js');
const prisma = new PrismaClient();

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


exports.signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Crear el usuario en la base de datos
        await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin
            },
        });

        // Autenticar al usuario recién creado y devolver la respuesta de inicio de sesión
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
            // Manejar el caso en que el usuario no se encuentra después de la creación
            res.status(401).json({ msg: 'Error al autenticar al usuario recién creado.' });
        }
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await prisma.users.findMany();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
    }
}
// Actualizar perfil de usuario (sin autenticación)
exports.updateProfile = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del usuario se pasa como parámetro en la URL
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
        return res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};
// Eliminar un usuario por su id (sin autenticación)
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.users.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};