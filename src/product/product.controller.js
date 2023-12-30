import express from "express";
import {
  createProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
} from "./product.service.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @desc Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(parseInt(productId));
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @desc Create new product
router.post("/", async (req, res) => {
  try {
    const newProductData = {
      body: req.body,
      file: req.file,
    };
    console.log(
      "🚀 ~ file: product.controller.js:38 ~ router.post ~ newProductData:",
      newProductData
    );

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @desc Update product by Id
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const image_product = req.file;

    const product = await editProductById(parseInt(productId), {
      body: productData,
      file: image_product,
    });

    res.send({
      data: product,
      message: "edit product success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @desc Delete product by Id
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(parseInt(productId));

    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
