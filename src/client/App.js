import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './css/app.css';
import '@babel/polyfill';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import TasksList from './components/TasksList';
import TasksFilter from './components/TasksFilter';
import AddTask from './components/AddTask';
import ErrorModal from './components/ErrorModal';
import store from './store';

const contentNode = document.getElementById('contents');

const tasksList = ({ match }) => (
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

const singleTask = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h1>Task #{match.params.id}</h1>
      <Link to="/">Back</Link>
    </div>
  );
};

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/tasks/:id" component={singleTask} />
        <Route path="/" component={tasksList} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, contentNode);
