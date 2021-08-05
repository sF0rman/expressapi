import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';
import { Product } from "./Product";

interface ProductTableData {
  product_url: string;
  isExample?: boolean;
  no_title?: string;
  no_headers: string[];
  no_data: string[][];
  no_footnote?: string;
  en_title?: string;
  en_headers: string[];
  en_data: string[][];
  en_footnote?: string;
}

interface ProductTableDataModel extends ProductTableData, Model {
  id?: string;
}

const ProductTable = db.define<ProductTableDataModel>('productTable', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  no_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  no_headers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  no_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  no_footnote: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  en_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  en_headers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  en_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  en_footnote: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isExample: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

export {
  ProductTable,
  ProductTableData
}