import {
  deleteProduct,
  editProduct,
  findProductById,
  findProducts,
  insertProduct,
} from "./product.repository.js";

export const getAllProducts = async (req, res) => {
  const products = await findProducts();

  return products;
};

export const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

export const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);

  return product;
};

export const editProductById = async (id, newProductData) => {
  const currProduct = await getProductById(id);

  const product = await editProduct(currProduct, newProductData);

  return product;
};

export const deleteProductById = async (id) => {
  const product = await getProductById(id);
  await deleteProduct(id, product.cloudinary_id);
};
