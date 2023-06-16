const axios = require('axios');
const { DatabaseController } = require("../controllers/DatabaseController")
const router = require("express").Router();
const baseUrl = "https://raw.githubusercontent.com/aunanante/posrgresql-vcp/main/vcp-database.json";

// router.get("/", DatabaseController.getAllDatabase)
// router.get("/ville/", DatabaseController.getAllVilles)
// router.get("/commerce/", DatabaseController.getAllCommerces)
// router.get("/commerce/ville/:id", DatabaseController.getCommerceByVilleId)
// router.get("/productscategory/", DatabaseController.getAllProductCategorys)
// router.get("/productscategory/commerce/:id", DatabaseController.getProductCategoryByCommerceId)
// router.get("/product/", DatabaseController.getAllProducts)
// router.get("/product/category/:id", DatabaseController.getProductByCategoryId)

// Route to get all the villes
router.get("/ville", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const villes = jsonData.villes;
        res.send(villes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get all the commerces
router.get("/commerce", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const commerces = jsonData.commerces;
        res.send(commerces);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get all the commerces by ville ID
router.get("/commerce/ville/:id", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const commerces = jsonData.commerces.filter((commerce) => commerce.ville_id === parseInt(req.params.id));
        res.send(commerces);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get all product categories
router.get("/productscategory", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const productCategories = jsonData.categories;
        res.send(productCategories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get all the product categories by commerce ID
router.get("/productscategory/commerce/:id", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const productCategories = jsonData.categories.filter((productCategory) => productCategory.commerce_id ===  parseInt(req.params.id));
        res.send(productCategories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get all products
router.get("/product", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const products = jsonData.products;
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Route to get products by category ID
router.get("/product/category/:id", async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const jsonData = response.data;
        const products = jsonData.products.filter((product) => product.productCategory_id ===  parseInt(req.params.id));
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router