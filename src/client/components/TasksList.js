/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import axios from '../axios-tasks';
import * as actions from '../store/actions';

class TasksList extends React.Component {
  state = {
    tasks: [],
    sortBy: {
      name: 'id',
      asc: true
    }
  };

  columns = [
    { title: 'Id', name: 'id' },
    { title: 'Title', name: 'title' },
    { title: 'URL', name: 'url' },
    { title: 'Schedule', name: 'schedule' },
    { title: 'Status', name: 'active' },
    { title: 'Created', name: 'creation_date' },
    { title: 'Type', name: 'type' }
  ];

  componentDidMount = () => {
    this.props.requestRefresh();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { sortBy: currentSortBy } = this.state;
    const { sortBy: prevSortBy } = prevState;
    if (currentSortBy.name !== prevSortBy.name || currentSortBy.asc !== prevSortBy.asc) {
      this.props.requestRefresh();
    }

    if (this.props.refreshListRequested) {
      this.loadTasks();
    }
  };

  loadTasks = async () => {
    let result;
    const {
      sortBy: { name, asc }
    } = this.state;
    try {
      result = await axios.get('/tasks', {
        params: {
          ...this.props.filter,
          sortBy: name,
          order: asc ? 'asc' : 'desc'
        }
      });
    } finally {
      this.props.listRefreshed();
    }
    this.setState({ tasks: result.data });
  };

  onClickSortingColumn = name => () => {
    this.setState(prevState => {
      if (prevState.sortBy && prevState.sortBy.name !== name) {
        return {
          sortBy: { name, asc: true }
        };
      }
      return {
        sortBy: { name, asc: !prevState.sortBy.asc }
      };
    });
  };

  render() {
    const { tasks } = this.state;
    const { refreshListRequested: loading } = this.props;

    const tasksList = tasks.map(item => (
      <tr key={item.id} className={item.active ? '' : 'has-text-grey-light'}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>
          <a href={item.url}>{item.url}</a>
        </td>
        <td>{item.schedule}</td>
        <td>{item.active ? 'active' : 'inactive'}</td>
        <td>{new Date(item.creation_date).toLocaleString()}</td>
        <td>{item.type}</td>
      </tr>
    ));

    const tableHeaderColumns = this.columns.map(column => {
      const {
        sortBy: { name: currentSortName, asc: isCurrentSortOrderAsc }
      } = this.state;
      let order;
      if (column.name === currentSortName) {
        order = isCurrentSortOrderAsc ? 'asc' : 'desc';
      }
      return (
        <SortingTitle
          key={column.name}
          title={column.title}
          order={order}
          onClick={this.onClickSortingColumn(column.name)}
        />
      );
    });

    let tableClasses = 'table is-bordered is-striped is-narrow is-hoverable content is-small';
    if (loading) tableClasses += ' custom-loading';

    return (
      <table className={tableClasses}>
        <thead>
          <tr>{tableHeaderColumns}</tr>
        </thead>
        <tbody>{tasksList}</tbody>
      </table>
    );
  }
}

const SortingTitle = ({ title, order, onClick }) => {
  let orderingArrows = '⭥';
  let orderingArrowsClasses = 'level-right content';

  switch (order) {
    case 'asc':
      orderingArrows = '⭡';
      orderingArrowsClasses += ' has-text-danger';
      break;
    case 'desc':
      orderingArrows = '⭣';
      orderingArrowsClasses += ' has-text-danger';
      break;
    default:
      orderingArrows = '⭥';
      orderingArrowsClasses += ' has-text-grey-light';
  }

  return (
    <th onClick={onClick}>
      <div className="level custom-table-title-clickable">
        <span className="level-left">{title}</span>
        <span className={orderingArrowsClasses}>{orderingArrows}</span>
      </div>
    </th>
  );
};

const mapStateToProps = state => ({
  refreshListRequested: state.tasks.refreshListRequested,
  filter: state.tasks.filter
});

const mapDispatchToProps = dispatch => ({
  requestRefresh: () => dispatch(actions.refreshList()),
  listRefreshed: () => dispatch(actions.listRefreshed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
