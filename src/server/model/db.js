import knex from 'knex';
import connectionConfig from '../configs/pgconnection';

const dbconnection = knex(connectionConfig); // connect to DB via knex using env's settings

export default dbconnection;
