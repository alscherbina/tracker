import React from 'react';
import axios from '../axios-tasks';

export default class TasksList extends React.Component {
  state = { tasks: [] };

  async componentDidMount() {
    const result = await axios.get('/tasks');
    this.setState({ tasks: result.data });
  }

  render() {
    const { tasks } = this.state;
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
    return (
      <table className="table is-bordered is-striped is-narrow is-hoverable content is-small">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>URL</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Created</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{tasksList}</tbody>
      </table>
    );
  }
}
