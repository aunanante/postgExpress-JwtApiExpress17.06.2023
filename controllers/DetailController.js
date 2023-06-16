const { Op } = require("sequelize");
const { objectCleaner } = require("../helpers/objectHelper");
const { Product } = require("../models/Product");
const { Detail } = require("../models/Detail");

exports.DetailController = {
    async create(req, res) {
        const detail = await Detail.create({

            detailName: req.body.detailName,
            imageDetailUrl: req.body.imageDetailUrl,
            product_id: req.body.product_id,
            
        });
        res.send(detail);
    },

    async update(req, res) {
        const body = objectCleaner(req.body);

        const detail = await Detail.update(body, {
            where: {
                id: req.params.id,
            },
        });

        res.send({ message: "Detail info updated successfully" });
    },

    async delete(req, res) {
        const detail = await Detail.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.send({ message: "Detail deleted successfully" });
    },

    async getDetailById(req, res) {
        const detail = await Detail.findByPk(req.params.id);
        res.send(detail);
    },

    async getAllDetails(req, res) {
        res.send(await Detail.findAll())
    },

    async getDetailByProductId(req, res) {
        try {

            const details = await Detail.findAll({
                where: { product_id: req.params.id },
                //include: [{ model: ProductCategory }],
            });

            if (!details.length) {
                return res.status(404).json({ message: 'No detail found for this product.' });
            }

            // return res.status(200).json({ products });
            res.send(details);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },

};
