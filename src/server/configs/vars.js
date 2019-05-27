import * as dotenv from 'dotenv-safe';

// import .env variables
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  pgURI: process.env.PG_URI,
  logDirectoryName: 'log',
  user: process.env.USER,
  password: process.env.PASSWORD
};

export default config;
