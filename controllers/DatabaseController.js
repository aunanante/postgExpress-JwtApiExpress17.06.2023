const { Op } = require("sequelize");
const { objectCleaner } = require("../helpers/objectHelper");
const { Product } = require("../models/Product");
const { ProductCategory } = require("../models/ProductCategory");
const { Ville } = require("../models/Ville");
const { Commerce } = require("../models/Commerce");

exports.DatabaseController = {
    async getAllDatabase(req, res) {
        // res.send(await Product.findAll())
        try {
            const villes = await Ville.findAll();
            const commerces = await Commerce.findAll();
            const categories = await ProductCategory.findAll();
            const products = await Product.findAll();
            const database = { villes, commerces, categories, products };
            res.json(database);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getAllVilles(req, res) {
        res.send(await Ville.findAll())
    },

    async getAllCommerces(req, res) {
        res.send(await Commerce.findAll())
    },

    async getAllProductCategorys(req, res) {
        res.send(await ProductCategory.findAll())
    },

    async getAllProducts(req, res) {
        res.send(await Product.findAll())
    },

    async getCommerceByVilleId(req, res) {

        const commerces = await Commerce.findAll({
            where: {
                ville_id: req.params.id,
            },
        });
        res.send(commerces);
    },

    async getProductCategoryByCommerceId(req, res) {
        const categories = await ProductCategory.findAll({
            where: {
                commerce_id: req.params.id,
            }
        });
        res.send(categories);
    },

    async getProductByCategoryId(req, res) {
        try {

            const products = await Product.findAll({
                where: { productCategory_id: req.params.id },
            });

            if (!products.length) {
                return res.status(404).json({ message: 'No product found for this category.' });
            }
            // return res.status(200).json({ products });
            res.send(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}
