import dotenv from 'dotenv';


dotenv.config();


export default {
  SCRAPINGHUB_API_KEY: process.env.SCRAPINGHUB_API_KEY,
  SCRAPINGHUB_PROJECT_ID: process.env.SCRAPINGHUB_PROJECT_ID,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
}
