import ProductModel, { ProductDocument } from "../models/product.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import uniqid from "uniqid";
import { Request, Response } from "express";

export type SeachQuery = {
  name: string;
  productTypeId?: string;
  categoryId?: string;
};
const createProduct = async (
  productBody: Omit<ProductDocument, "productCode">
) => {
  const productCode =
    productBody.name.slice(0, 1) +
    productBody.productCategoryId.toString().substr(-2) +
    productBody.productTypeId.toString().substr(-2) +
    uniqid.process().slice(4);
  const newProduct = await ProductModel.create({ ...productBody, productCode });
  return newProduct;
};

const getProducts = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  const archived = req.query.archived === "true" ? true : false;
  console.log("archived", archived);
  let perPage = limit > 1 && limit < 9 ? limit : 9;
  let page = Number(req.query.page) || 1;
  let searchQuery = ProductModel.find({ isDelete: archived });

  if (req.query.name) {
    const baseRegex = new RegExp(req.query.name.toString(), "i");
    searchQuery = searchQuery.where({
      $or: [{ productCode: baseRegex }, { name: baseRegex }],
    });
  }
  if (req.query.productTypeId) {
    searchQuery.where({ productTypeId: req.query.productTypeId });
  }
  if (req.query.categoryId) {
    searchQuery.where({ productCategoryId: req.query.categoryId });
  }

  const productList = await ProductModel.find(searchQuery)
    .sort({ _id: -1 })
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalProduct = await ProductModel.countDocuments(searchQuery);
  const totalPage = Math.ceil(totalProduct / perPage);

  return {
    productList,
    currentPage: page,
    limit: perPage,
    totalProduct,
    totalPage: totalPage,
  };
};

const getProductById = async (id: string) => {
  return ProductModel.findById(id);
};
const updateProductById = async (
  productId: string,
  updateBody: any,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (files) {
    const mainImage = files.image ? files.image[0]?.path : null;
    const slideImageInfo = Object.keys(files).map((it) => {
      console.log(files[it][0]);
      const fileInfo = files[it][0];
      return {
        index: Number(fileInfo.fieldname.split("slideImages")[1]),
        path: fileInfo.path || "null",
      };
    });
    console.log("slideImageInfo", slideImageInfo);
    console.log("updateBody", updateBody);

    slideImageInfo.forEach((it) => {
      product.slideImages[it.index] = it.path;
    });
    if (mainImage) {
      product.image = mainImage;
    }
    Object.assign(product, updateBody);
    product.markModified("slideImages");
    product.markModified("image");
    await product.save();
    // console.log("UPDATE PRODUCT", product);
    return product;
  }
};

const softDeleteProductById = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  product.isDelete = true;
  await product.save();
};

const deleteProduct = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await product.remove();
  return product;
};

const retrieveProduct = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  product.isDelete = false;
  product.save();
  return product;
};

const productService = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  softDeleteProductById,
  retrieveProduct,
};

export default productService;
