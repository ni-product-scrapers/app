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

const graphqlCollectionDataPromise = (async () => {
  const chunks = await Promise.all(
    [0, 1].map(page =>
      request('http://native-instruments.com/graphql', graphqlProductQuery, {
        hitsPerPage: 500,
        page,
      }).catch(err => {
        return err.response.data;
      }),
    ),
  );
  return chunks.reduce(
    (
      acc,
      {
        user: {
          getProducts: {
            result: {items},
          },
        },
      },
    ) => [...acc, ...items],
    [],
  );
})();

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

  const graphqlCollectionData = await graphqlCollectionDataPromise;

  // add graphql data on every item
  const itemsWithGraphQL = await Promise.all(
    items.map(async ({sku, ...item}) => {
      const graphQLProduct = graphqlCollectionData.find((item) => item.sku === sku);
      return {...item, ...graphQLProduct};
    }),
  );

  res.status(200).json(itemsWithGraphQL);
};
