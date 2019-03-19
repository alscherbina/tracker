import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class TasksFilter extends React.Component {
  state = {};

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
    const { props } = this;
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
                  value={this.state.searchText || ''}
                  onChange={this.onFormFieldChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="taskStatus" value="All" defaultChecked required="required" />
                  All
                </label>
                <label className="radio">
                  <input type="radio" name="taskStatus" value="Active" required="required" />
                  Active
                </label>
                <label className="radio">
                  <input type="radio" name="taskStatus" value="Inactive" required="required" />
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
