import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class TasksFilter extends React.Component {
  state = { tasksStatus: '', searchText: '' };

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  onFormFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFilterClick = () => {
    this.props.setTasksFilter(this.state);
    this.props.requestRefresh();
  };

  render() {
    const { props, state } = this;
    return (
      <div className="box has-background-light">
        <form className="form-horizontal">
          <fieldset>
            <legend>Filter</legend>

            <div className="field">
              <label className="label" />
              <div className="control">
                <input
                  name="searchText"
                  type="text"
                  placeholder="Search text ..."
                  className="input"
                  value={state.searchText}
                  onChange={this.onFormFieldChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="tasksStatus"
                    value=""
                    required="required"
                    checked={state.tasksStatus === ''}
                    onChange={this.onFormFieldChange}
                  />
                  All
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="tasksStatus"
                    value="active"
                    required="required"
                    checked={state.tasksStatus === 'active'}
                    onChange={this.onFormFieldChange}
                  />
                  Active
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="tasksStatus"
                    value="inactive"
                    required="required"
                    checked={state.tasksStatus === 'inactive'}
                    onChange={this.onFormFieldChange}
                  />
                  Inactive
                </label>
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button
                  className="button is-link"
                  type="button"
                  disabled={props.refreshListRequested}
                  onClick={this.onFilterClick}
                >
                  Filter
                </button>
              </div>
              <div className="control">
                <button className="button is-dark" type="button">
                  Reset
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  refreshListRequested: state.tasks.refreshListRequested
});

const mapDispatchToProps = dispatch => ({
  requestRefresh: () => dispatch(actions.refreshList()),
  setTasksFilter: filter => dispatch(actions.setTasksFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksFilter);
