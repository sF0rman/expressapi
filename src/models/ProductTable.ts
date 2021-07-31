import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';
import { Product } from "./Product";

const tableData: ProductTableData[] = [{
  "product_url": 'ploganker',
  "no_title": null,
  "no_headers": ["Artikkel nummer", "Beskrivelse", "Holdekraft*", "MBL Innfestning", "Vekt", "Areal bunnplate"],
  "no_data": [
    ["AQL30HP", "AQUALINK 500", "30 TONN", "64 TONN", "515 kg", "1.43m"],
    ["AQL45HP", "AQUALINK 75000", "45 TONN", "92 TONN", "760 kg", "1.81m"],
    ["AQL55HP", "AQUALINK 1000", "55 TONN", "94 TONN", "1020 kg", "2.26m"],
    ["AQL70HP", "AQUALINK 1400", "70 TONN", "110 TONN", "1400 kg", "3.00m"],
    ["AQL90HP", "AQUALINK 2000", "90 TONN", "164 TONN", "1990 kg", "3.89m"]
  ],
  "en_headers": ["Article number", "Description", "Strength*", "MBL Fastening", "Weight", "Bottomplate area"],
  "en_data": [
    ["AQL30HP", "AQUALINK 500", "30 TONS", "64 TONS", "515 kg", "1.43m"],
    ["AQL45HP", "AQUALINK 75000", "45 TONS", "92 TONS", "760 kg", "1.81m"],
    ["AQL55HP", "AQUALINK 1000", "55 TONS", "94 TONS", "1020 kg", "2.26m"],
    ["AQL70HP", "AQUALINK 1400", "70 TONS", "110 TONS", "1400 kg", "3.00m"],
    ["AQL90HP", "AQUALINK 2000", "90 TONS", "164 TONS", "1990 kg", "3.89m"]
  ]
}]

interface ProductTableData {
  product_url: string;
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

Product.hasMany(ProductTable, {
  foreignKey: 'product_url'
});
ProductTable.belongsTo(Product, {
  foreignKey: 'url'
});

ProductTable.sync({force: true}).then(async () => {
  const tables = await ProductTable.findAll();
  if (!tables || !tables.length) {
    console.log('Creating initial Tables...');
    await ProductTable.bulkCreate(tableData);
    console.log('Created Tables!');
  }
}).catch(err => {
  console.log('Unable to create product tables', err);
});

export {
  ProductTable,
  ProductTableData
}