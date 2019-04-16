import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './css/app.css';
import '@babel/polyfill';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TasksList from './components/TasksList';
import TasksFilter from './components/TasksFilter';
import AddTask from './components/AddTask';
import ErrorModal from './components/ErrorModal';
import store from './store';
import TaskDetail from './components/TaskDetail';

const contentNode = document.getElementById('contents');

const tasksList = () => (
  <>
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
  </>
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/tasks/:id" component={TaskDetail} />
        <Route path="/" component={tasksList} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, contentNode);
