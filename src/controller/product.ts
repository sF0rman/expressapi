import { RequestHandler } from "express";
import { HTTPCode } from "../models/HTTPCodes";
import { BadRequestError } from "../utils/errorHandler";
import { Resource } from "../utils/errorHandler";
import { ResourceNotFoundError } from "../utils/errorHandler";
import { okResponse } from "../utils/utils";
import { Product, ProductData } from '../models/Product';
import { ProductTable } from "../models/ProductTable";
import { ProductImage } from "../models/ProductImage";

const getAllProducts: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const found: any = await Product.findAll();
    if (!found) {
      return next(new ResourceNotFoundError(Resource.Product));
    }
    res.status(HTTPCode.OK).send(okResponse(found));
  } catch (err) {
    next(err);
  }
}

const getProductById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError()) }

    const product: ProductData = await Product.findByPk(id, { include: [ProductTable, ProductImage] });
    if (!product) {
      return next(new ResourceNotFoundError(Resource.Product));
    }

    res.status(HTTPCode.OK).send(okResponse(product));
  } catch (err) {
    next(err);
  }
}

export {
  getAllProducts,
  getProductById
}