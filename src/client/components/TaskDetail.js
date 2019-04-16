import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries } from 'react-vis';
import axios from '../axios-tasks';

class TaskDetail extends Component {
  state = {
    task: {},
    data: [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 7 },
      { x: 8, y: 6 },
      { x: 9, y: 12 }
    ]
  };

  async componentDidMount() {
    const taskId = this.props.match.params.id;
    this.loadTask(taskId);
  }

  loadTask = async taskId => {
    try {
      const result = await axios.get(`/tasks/${taskId}`);
      this.setState({ task: result.data });
    } catch (err) {
      //this.props.reportError(err);
    }
  };

  render() {
    const { match } = this.props;
    const { task, data } = this.state;
    console.log(task);

    return (
      <div>
        <h1>Task #{match.params.id}</h1>
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default TaskDetail;
