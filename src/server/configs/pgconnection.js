const config = {
  development: {
    client: 'pg',
    connection:
      'postgres://kllrvryxgafhpw:08508aaca88a87e28a29dbb0b2169737305514b00cc04767f37ec9ddfdb6bf58@ec2-54-75-226-5.eu-west-1.compute.amazonaws.com:5432/d3tcigb8pga445?ssl=true',
    pool: { min: 0, max: 2 },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};

export default config;
