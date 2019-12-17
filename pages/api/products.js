import fetch from 'node-fetch';
import stub from './products.json';
import config from '../../config';
import {request} from 'graphql-request';
import MongoClient from 'mongodb';
import graphqlProductQuery from '../../lib/products.query';

const {
  SCRAPINGHUB_API_KEY,
  SCRAPINGHUB_PROJECT_ID,
  MONGO_CONNECTION_STRING,
} = config;

// move to database?
const SHOPS = [
  {
    name: 'thomann',
    logo:
      'https://jobs.thomann.de/wp-content/themes/thomann-jobs-theme/img/header/thomann-jobs-logo.svg',
  },
  {
    name: 'justmusic',
    logo: 'https://media.justmusic.de/shop/images/justmusic-logo.png',
  },
];

const logos = SHOPS.reduce((acc, {name, logo}) => ({...acc, [name]: logo}), {});

const getItems = () =>
  new Promise(resolve => {
    MongoClient.connect(MONGO_CONNECTION_STRING, (err, client) => {
      const collection = client.db('scraped-products').collection('items');
      collection.find().toArray((err, docs) => {
        resolve(docs);
      });
    });
  });

const getGraphQLProduct = search => {
  return request('http://native-instruments.com/graphql', graphqlProductQuery, {
    hitsPerPage: 1,
    search,
  });
};

export default async (req, res) => {
  const itemsRaw = await getItems();

  const itemsMap = itemsRaw.reduce((acc, {sku, name, shop, ...rest}) => {
    if (!acc[sku]) {
      acc[sku] = {
        sku,
        title: name,
        shops: [],
      };
    }
    acc[sku].shops.push({title: name, shop, shop_logo: logos[shop], ...rest});
    return acc;
  }, {});

  const items = Object.values(itemsMap);

  // add graphql data on every item
  const itemsWithGraphQL = await Promise.all(
    items.map(async ({sku, ...item}) => {
      const graphQLreq = await getGraphQLProduct(sku);
      const graphQLProduct = graphQLreq.user.getProducts.result.items[0];
      return {...item, ...graphQLProduct};
    }),
  );

  res.status(200).json(itemsWithGraphQL);
};
