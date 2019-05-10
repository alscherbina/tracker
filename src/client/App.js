/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TasksList from './components/TasksList';
import TasksFilter from './components/TasksFilter';
import AddTask from './components/AddTask';
import TaskDetail from './components/TaskDetail';
import SignInForm from './components/SignInForm';

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
  </>
);

class App extends Component {
  componentDidMount = () => {};

  render() {
    const { authenticated } = this.props;

    let route = <SignInForm />;

    if (authenticated) {
      route = (
        <Switch>
          <Route path="/tasks/:id" component={TaskDetail} />
          <Route path="/" component={tasksList} />
        </Switch>
      );
    }

    return route;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.signedIn
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
