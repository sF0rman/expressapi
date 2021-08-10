import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';
import { ProductTable, ProductTableData } from "./ProductTable";
import { ProductImage, ProductImageData } from "./ProductImage";

const productData: ProductData[] = require('../database/data/products.json');
const tableData: ProductTableData[] = require('../database/data/productTable.json');
const imageData: ProductImageData[] = require('../database/data/productImages.json');

interface ProductData {
  url: string;
  thumbnail: string;
  en_title: string;
  no_title: string;
  en_description: string;
  no_description: string;
  product_image?: string;
  no_video?: string;
  en_video?: string;
}

interface ProductDataModel extends ProductData, Model { }

const Product = db.define<ProductDataModel>('product', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  en_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  en_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  no_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  product_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  no_video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  en_video: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Product.sync({force: true}).then(async () => {

  ProductTable.belongsTo(Product, {
    foreignKey: 'product_url'
  });
  Product.hasMany(ProductTable, {
    foreignKey: 'product_url'
  });

  ProductImage.belongsTo(Product, {
    foreignKey: 'product_url'
  });
  Product.hasMany(ProductImage, {
    foreignKey: 'product_url'
  })

  const products = await Product.findAll();
  if (!products || !products.length) {
    console.log('Products: Populating data...');
    await Product.bulkCreate(productData);
    console.log('Products: Data added!');
  }

  ProductImage.sync({force: true}).then(async () => {
    const images = await ProductImage.findAll();
    if (!images || !images.length) {
      console.log('ProductImage: Populating data...');
      await ProductImage.bulkCreate(imageData);
      console.log('ProductImage: Data Added');
    }
  }).catch(err => {
    console.log('ProductImage: Unable to add data!', err);
  });

  ProductTable.sync({force: true}).then(async () => {
    const tables = await ProductTable.findAll();
    if (!tables || !tables.length) {
      console.log('ProductTable: Populating data...');
      await ProductTable.bulkCreate(tableData);
      console.log('ProductTable: Data Added');
    }
  }).catch(err => {
    console.log('ProductTable: Unable to add data!', err);
  });

}).catch(err => {
  console.log('Products: Unable to add data', err);
});

export {
  Product,
  ProductData
}