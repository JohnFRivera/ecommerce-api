import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { getErrors } from "../helpers/errors.js";

const findAll = async (req, res) => {
    try {
        const users = await User.find().select({ name: 1, email: 1, address: 1, role: 1 });
        res.status(200).send(users);
    } catch (error) {
        res.status(400).res({ error });
    }
};
const findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select({ name: 1, email: 1, address: 1, role: 1 });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error });
    }
};
const register = async (req, res) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const newUser = await User.create(req.body);
        res.status(200).send(newUser);
    } catch (error) {
        if (error.code) {
            if (error.code == 11000) {
                res.status(400).send({ id: "email", message: "El email que ingresaste ya existe" });
            }
        }
        if (error.errors) {
            var errorArray = getErrors(error.errors);
            res.status(400).send(errorArray);
        } else {
            res.status(400).send(error);
        }
    };
};
const authenticate = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({ access: true, userId: user._id, userEmail: user.email});
            } else {
                res.status(401).send({ access: false, message: "La contraseña es incorrecta" });
            }
        } else {
            res.status(401).send({ access: false, message: "El email no existe" });
        }
    } catch (error) {
        res.status(400).send({ error });
    }
};

const updateAddress = async (req, res) => {
    const { userId, address } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // Actualiza la dirección del usuario
        user.address = address;
        const updatedUser = await user.save();

        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: "Error al actualizar la dirección", details: error });
    }
};

export {
    findAll,
    findById,
    register,
    authenticate,
    updateAddress 
};