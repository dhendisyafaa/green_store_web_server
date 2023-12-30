import cloudinary from "../configs/cloudinary.js";
import prisma from "../db/index.js";

export const findProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        stock_status: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return products;
};

export const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

export const checkStockStatus = (stock) => {
  const stockStatus = stock > 0 ? "READY" : "EMPTY";
  return stockStatus;
};

export const insertProduct = async (productData) => {
  const { body, file } = productData;

  if (!file) {
    const err = new Error("please for upload product image!");
    err.errStatus = 422;
    throw err;
  }

  const upload = await cloudinary.uploader.upload(file.path, {
    folder: "product_green_store",
  });

  const stock_status = checkStockStatus(parseInt(body.stock));

  const product = await prisma.product.create({
    data: {
      title: body.title,
      image_product: upload.secure_url,
      cloudinary_id: upload.public_id,
      price: parseInt(body.price),
      stock: parseInt(body.stock),
      stock_status: stock_status,
    },
  });

  return product;
};

export const editProduct = async (currProduct, newProductData) => {
  const { body, file } = newProductData;

  const stock_status = checkStockStatus(parseInt(body.stock));

  const product = await prisma.product.update({
    where: {
      id: currProduct.id,
    },
    data: {
      title: body.title,
      image_product: currProduct.secure_url,
      cloudinary_id: currProduct.public_id,
      price: parseInt(body.price),
      stock: parseInt(body.stock),
      stock_status: stock_status,
    },
  });

  return product;
};

export const deleteProduct = async (id, cloudinary_id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
  await cloudinary.uploader.destroy(cloudinary_id);
};
