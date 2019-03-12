import * as dotenv from 'dotenv-safe';

// import .env variables
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  pgURI: process.env.PG_URI
};

export default config;
