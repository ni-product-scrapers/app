import fetch from 'node-fetch';
import stub from './products.json';
import config from '../../config';
import { request } from 'graphql-request'
import graphqlProductQuery from '../../lib/products.query';

const getGraphQLProduct = (search) => {
  return request(
    'http://native-instruments.com/graphql',
    graphqlProductQuery,
    { hitsPerPage: 1, search }
  )
}

const {SCRAPINGHUB_API_KEY, SCRAPINGHUB_PROJECT_ID} = config;

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

const spiders = SHOPS.map(({name}) => name);
const logos = SHOPS.reduce((acc, {name, logo}) => ({...acc, [name]: logo}), {});

const getJobIds = () =>
  Promise.all(
    spiders.map(async spiderName => {
      const url = `https://app.scrapinghub.com/api/jobs/list.json?apikey=${SCRAPINGHUB_API_KEY}&project=${SCRAPINGHUB_PROJECT_ID}&spider=${spiderName}&state=finished&count=1`;
      const response = await fetch(url);
      const {jobs} = await response.json();
      return jobs[0].id;
    }),
  );

export default async (req, res) => {
  if (req.query.mock) {
    return res.status(200).json(stub);
  }

  console.log('requesting job ids');
  const jobIds = await getJobIds();
  console.log(`got job ids: ${JSON.stringify(jobIds)}`);
  console.log('requesting items');
  const itemsRaw = await Promise.all(
    jobIds.map(async jobId => {
      const url = `https://storage.scrapinghub.com/items/${jobId}?apikey=${SCRAPINGHUB_API_KEY}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }),
  );

  const itemsMap = itemsRaw.reduce((acc, items) => {
    items.forEach(({sku, name, shop, ...rest}) => {
      if (!acc[sku]) {
        acc[sku] = {
          sku,
          title: name,
          shops: [],
        };
      }
      acc[sku].shops.push({title: name, shop, shop_logo: logos[shop], ...rest});
    });
    return acc;
  }, {});

  const items = Object.values(itemsMap);

  // add graphql data on every item
  const itemsWithGraphQL = await Promise.all(
    items.map( async ({sku, ...item}) => {
      const graphQLreq = await getGraphQLProduct(sku);
      const graphQLProduct = graphQLreq.user.getProducts.result.items[0];
      return {...item, ...graphQLProduct};
    })
  );

  res.status(200).json(itemsWithGraphQL);
};
