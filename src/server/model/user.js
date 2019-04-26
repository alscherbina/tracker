/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import db from './db';
import log from '../configs/logger';

export async function getUser(userId) {
  // const user = db('user')
  //   .select()
  //   .where('id', userId);
  const user = { id: 'admin', password: 'admin' };
  log.verbose(`Fetched user profile for ${userId}`);
  return user;
}

export async function createUser(userId, password) {
  //Not implemented yet
  return null;
}
