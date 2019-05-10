import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/react-vis/dist/style.css';
import { FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { connect } from 'react-redux';
import axios from '../axios-tasks';
import * as actions from '../store/actions';

class TaskDetail extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const taskId = this.props.match.params.id;
    this.loadTask(taskId);
  }

  loadTask = async taskId => {
    try {
      const result = await axios.get(`/journal/${taskId}`);
      const seriesData = result.data.map(item => ({ x: Date.parse(item.date), y: item.result }));
      this.setState({ data: seriesData });
    } catch (err) {
      this.props.reportError(err);
    }
  };

  render() {
    const { match } = this.props;
    const { data } = this.state;

    return (
      <div>
        <h1>Task #{match.params.id}</h1>
        <FlexibleWidthXYPlot height={400}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            tickFormat={value => {
              const date = new Date(value);
              return `${date.getMonth() + 1}.${date.getDate()}`;
            }}
          />
          <YAxis tickLabelAngle={25} width={40} tickPadding={0} />
          <LineSeries data={data} />
        </FlexibleWidthXYPlot>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  reportError: error => dispatch(actions.generalShowError(error))
});

export default connect(
  null,
  mapDispatchToProps
)(TaskDetail);
