import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './css/app.css';
import '@babel/polyfill';
import TasksList from './components/TasksList';
import TasksFilter from './components/TasksFilter';
import AddTask from './components/AddTask';
import ErrorModal from './components/ErrorModal';
import store from './store';

const contentNode = document.getElementById('contents');

const app = (
  <Provider store={store}>
    <div className="columns">
      <aside className="column is-narrow">
        <TasksFilter />
        <AddTask />
      </aside>
      <div className="column">
        <TasksList />
      </div>
    </div>
    <ErrorModal />
  </Provider>
);

ReactDOM.render(app, contentNode);
