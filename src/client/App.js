import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.min';
import 'bulma/css/bulma.min.css';
import './css/app.css';
import '@babel/polyfill';
import TasksList from './components/TasksList';
import TasksFilter from './components/TasksFilter';
import AddTask from './components/AddTask';

const contentNode = document.getElementById('contents');

const app = (
  <div className="columns">
    <aside className="column is-narrow">
      <TasksFilter />
      <AddTask />
    </aside>
    <div className="column">
      <TasksList />
    </div>
  </div>
);

ReactDOM.render(app, contentNode);
