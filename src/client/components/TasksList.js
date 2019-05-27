/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import axios from '../axios-tasks';
import * as actions from '../store/actions';
import DeleteTask from './DeleteTask';
import { Link } from 'react-router-dom';

class TasksList extends React.Component {
  state = {
    tasks: [],
    sortBy: {
      name: 'id',
      asc: true
    },
    deletingTaskId: undefined
  };

  columns = [
    { title: 'Id', name: 'id', sorting: true },
    { title: 'Title', name: 'title', sorting: true },
    { title: 'URL', name: 'url', sorting: true },
    { title: 'Schedule', name: 'schedule', sorting: true },
    { title: 'Status', name: 'active', sorting: true },
    { title: 'Created', name: 'creation_date', sorting: true },
    { title: 'Type', name: 'type', sorting: true },
    { title: 'Actions', name: 'actions', sorting: false }
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
    const {
      sortBy: { name, asc }
    } = this.state;
    axios
      .get('/tasks', {
        params: {
          ...this.props.filter,
          sortBy: name,
          order: asc ? 'asc' : 'desc'
        }
      })
      .then(result => {
        this.setState({ tasks: result.data });
      })
      .catch(err => {
        this.props.reportError(err);
      })
      .finally(() => {
        this.props.listRefreshed();
      });
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

  onClickDelete = taskId => () => {
    this.setState({ deletingTaskId: taskId });
  };

  onFinishDelete = () => {
    this.setState({ deletingTaskId: null });
  };

  render() {
    const { tasks, deletingTaskId } = this.state;
    const { refreshListRequested: loading } = this.props;

    const tasksList = tasks.map(item => (
      <tr key={item.id} className={item.active ? '' : 'has-text-grey-light'}>
        <td>
          <Link to={`/tasks/${item.id}`}>{item.id}</Link>
        </td>
        <td>{item.title}</td>
        <td>
          <a href={item.url}>{item.url}</a>
        </td>
        <td>{item.schedule}</td>
        <td>{item.active ? 'active' : 'inactive'}</td>
        <td>{new Date(item.creation_date).toLocaleString()}</td>
        <td>{item.type}</td>
        <td>
          <button className="delete" type="button" aria-label="delete" onClick={this.onClickDelete(item.id)} />
        </td>
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
      let columnHeader = null;
      if (column.sorting) {
        columnHeader = (
          <SortingTableTitle
            key={column.name}
            title={column.title}
            order={order}
            onClick={this.onClickSortingColumn(column.name)}
          />
        );
      } else {
        columnHeader = <PlainTableTitle key={column.name} title={column.title} />;
      }
      return columnHeader;
    });

    let tableClasses = 'table is-bordered is-striped is-narrow is-hoverable content is-small';
    if (loading) tableClasses += ' custom-loading';

    return (
      <>
        <table className={tableClasses}>
          <thead>
            <tr>{tableHeaderColumns}</tr>
          </thead>
          <tbody>{tasksList}</tbody>
        </table>
        {deletingTaskId ? <DeleteTask taskId={deletingTaskId} onFinishDelete={this.onFinishDelete} /> : ''}
      </>
    );
  }
}

const SortingTableTitle = ({ title, order, onClick }) => {
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

const PlainTableTitle = ({ title }) => {
  return (
    <th>
      <div className="level">
        <span className="level-left">{title}</span>
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
  listRefreshed: () => dispatch(actions.listRefreshed()),
  reportError: error => dispatch(actions.generalShowError(error))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
