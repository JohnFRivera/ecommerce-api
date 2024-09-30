import Product from "../models/Product.js";
import { getErrors } from "../helpers/errors.js";

const findAll = async (req, res) => {
    try {
        let products = await Product.find().populate("category", "name").exec();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({ error });
    }
};
const findById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name").exec();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error });
    }
};
const findByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: { _id: req.params.id } }).populate("category", "name").exec();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({ error });
    }
};
const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).send(newProduct);
    } catch (error) {
        if (error.errors) {
            var errorArray = getErrors(error.errors);
            res.status(400).send(errorArray);
        } else {
            res.status(400).send(error);
        }
    };
};
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({ _id: req.params.id }, req.body);
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).res({ error });
    };
};
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({ _id: req.params.id });
        res.status(200).send(deletedProduct);
    } catch (error) {
        res.status(400).res({ error });
    };
};

export {
    findAll,
    findById,
    findByCategory,
    addProduct,
    updateProduct,
    deleteProduct
};