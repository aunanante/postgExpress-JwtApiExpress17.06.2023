const { Op } = require("sequelize");
const { objectCleaner } = require("../helpers/objectHelper");
const { Product } = require("../models/Product");
const { ProductCategory } = require("../models/ProductCategory");


exports.ProductController = {
  async create(req, res) {
    const product = await Product.create({
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      unitPrice: req.body.unitPrice,
      imageUrl: req.body.imageUrl,
      active: req.body.active,
      unitsInStock: req.body.unitsInStock,
      dateCreated: req.body.dateCreated,
      lastUpdate: req.body.lastUpdate,
      productCategory_id: req.body.productCategory_id,
    });

    res.send(product);
  },

  async update(req, res) {
    const body = objectCleaner(req.body);

    const product = await Product.update(body, {
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Product info updated successfully" });
  },

  async delete(req, res) {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Product deleted successfully" });
  },

  async getProductById(req, res) {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  },

  /* async getProductsByTeam(req, res) {
    const products = await Product.findAll({
      where: {
        teamId: req.params.team_id,
      },
    });
    res.send(products);
  }, */

  async getAllProducts(req, res) {
    res.send(await Product.findAll())
  },

  async searchProduct(req, res) {
    // const products = await Product.findAll({
    //   where: {
    //     [Op.and]: [
    //       {
    //         teamId: req.params.team_id,
    //         name: {
    //           [Op.like]: `%${req.query.search}%`,
    //         },
    //       },
    //     ],
    //   },
    // });

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      },
    });

    res.send(products);
  },

  /* async getProductByCategoryId(req, res) {
    const products = await Product.findAll({
      productCategory_id: req.params.id,
    });
    res.send(products);
  }, */

  async getProductByCategoryId(req, res) {
    try {
      
      const products = await Product.findAll({
        where: { productCategory_id: req.params.id },
        //include: [{ model: ProductCategory }],
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

};
