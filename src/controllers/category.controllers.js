import Category from "../models/Category.js";
import { getErrors } from "../helpers/errors.js";

const findAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).res({ error });
    }
};
const findById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).send(category);
    } catch (error) {
        res.status(400).res({ error });
    }
};
const addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(200).send(newCategory);
    } catch (error) {
        if (error.errors) {
            var errorArray = getErrors(error.errors);
            res.status(400).send(errorArray);
        } else {
            res.status(400).send(error);
        }
    };
};
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.updateOne({ _id: req.params.id }, req.body);
        res.status(200).send(updatedCategory);
    } catch (error) {
        res.status(400).res({ error });
    };
};
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.deleteOne({ _id: req.params.id });
        res.status(200).send(deletedCategory);
    } catch (error) {
        res.status(400).res({ error });
    };
};

export {
    findAll,
    findById,
    addCategory,
    updateCategory,
    deleteCategory
};