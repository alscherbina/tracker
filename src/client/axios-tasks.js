import axios from 'axios';
import { Cookies } from 'react-cookie';
import store from './store';
import * as actions from './store/actions';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 5000
});

instance.interceptors.response.use(
  response => response,
  error => {
    const status = error.status || error.response.status;
    if (status === 403 || status === 401) {
      new Cookies().set('signedIn', false, { path: '/' });
      store.dispatch(actions.signOut());
    }
    return Promise.reject(error);
  }
);

export default instance;
