import fetch from 'node-fetch';
import config from '../../config';


const{ SCRAPINGHUB_API_KEY, SCRAPINGHUB_PROJECT_ID } = config;

const SPIDERS = ['thomann'];

const getJobIds = () => Promise.all(SPIDERS.map(async spiderName => {
  const url = `https://app.scrapinghub.com/api/jobs/list.json?apikey=${SCRAPINGHUB_API_KEY}&project=${SCRAPINGHUB_PROJECT_ID}&spider=${spiderName}&state=finished&count=1`;
  const response = await fetch(url);
  const { jobs } = await response.json();
  return jobs[0].id;
}));


export default async (req, res) => {
  console.log('requesting job ids');
  const jobIds = await getJobIds();
  console.log(`got job ids: ${JSON.stringify(jobIds)}`);
  console.log('requesting items');
  const itemsRaw = await Promise.all(jobIds.map(async jobId => {
    const url = `https://storage.scrapinghub.com/items/${jobId}?apikey=${SCRAPINGHUB_API_KEY}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }));
  const items = itemsRaw.reduce((acc, items) => [...acc, ...items], []);
  res.status(200).json(items)
}
