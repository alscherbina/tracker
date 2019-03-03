import knex from 'knex';
import connectionConfig from './configs/pgconnection';

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = connectionConfig[environment]; // require environment's settings from knexfile
const dbconnection = knex(configuration); // connect to DB via knex using env's settings

export default dbconnection;
