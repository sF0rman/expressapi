import { DataTypes, Model } from "sequelize";
import {db} from '../database/database';
import { Product } from "./Product";

interface ProductImageData {
  product_url: string;
  image_url: string;
}

interface ProductImageDataModel extends ProductImageData, Model {
  id?: string
}

const ProductImage = db.define<ProductImageDataModel>('productImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export {
  ProductImageData,
  ProductImage
}