import React from 'react';
import tasks from './stub.tasks.json';

export default class TasksList extends React.Component {
  state = { tasks };

  render() {
    const tasksList = this.state.tasks.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.date}</td>
      </tr>
    ));
    return (
      <table className="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{tasksList}</tbody>
      </table>
    );
  }
}
