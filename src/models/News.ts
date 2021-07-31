import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';

const data: NewsData[] = [
  {
    no_title: 'Nettsiden er oppe å går',
    no_intro: 'Vi har endelig fått nettsiden utviklet.',
    no_text: '<p>På kort varsel, har vi fått første versjon av nettsiden opp med produkt info og annet kult</p>',
    en_title: 'Website up and running',
    en_intro: 'Website is finally running',
    en_text: '<p>On short notice the first version of our website is up and running</p>',
    url: 'website-created',
    image_url: null
  }
]

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

News.sync({force: true}).then(async () => {
  const news = await News.findAll();
  if(!news || !news.length) {
    console.log('Creating initial news');
    await News.bulkCreate(data);
    console.log('Created News articles');
  }
});

export {
  News,
  NewsData
};