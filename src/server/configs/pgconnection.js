import config from './vars';

const pgConfigs = {
  development: {
    client: 'pg',
    connection: config.pgURI,
    pool: { min: 0, max: 2 },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: config.pgURI,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};

const currentConfig = pgConfigs[config.env] || pgConfigs.development;

export default currentConfig;
