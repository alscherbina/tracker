import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import 'regenerator-runtime/runtime';
import TasksList from './components/TasksList';
import Layout from './components/Layout';
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
