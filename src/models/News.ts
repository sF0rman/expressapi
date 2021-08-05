import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';

const data: NewsData[] = require('../database/data/news.json');

interface NewsData {
  no_title: string;
  no_intro: string;
  no_text: string;
  en_title: string;
  en_intro: string;
  en_text: string;
  url: string;
  image_url: string | null;
}

interface NewsDataModel extends NewsData, Model {
  id: string;
}

const News = db.define<NewsDataModel>('news', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  no_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_intro: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  no_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  en_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  en_intro: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  en_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

News.sync().then(async () => {
  const news = await News.findAll();
  if (!news || !news.length) {
    console.log('News: Populating data');
    await News.bulkCreate(data);
    console.log('News: Data added!');
  }
});

export {
  News,
  NewsData
};