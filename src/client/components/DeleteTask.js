import React from 'react';
import axios from '../axios-tasks';

class DeleteTask extends React.Component {
  state = { isSubmitting: false };

  onClickDeleteConfirm = async () => {
    this.setState({ isSubmitting: true });
    await axios.delete(`/task/${this.props.taskId}`);
    console.log(`Deleted task #${this.props.taskId}`);
    this.setState({ isSubmitting: false });
    this.props.onFinishDelete();
  };

  onClickDeleteCancel = () => {
    this.props.onFinishDelete();
  };

  render() {
    const { isSubmitting } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Delete</p>
            <button className="delete" aria-label="close" type="button" onClick={this.onClickDeleteCancel} />
          </header>
          <section className="modal-card-body has-text-centered">
            <div>Delete task #{this.props.taskId}?</div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              type="button"
              disabled={isSubmitting}
              onClick={this.onClickDeleteConfirm}
            >
              Delete
            </button>
            <button className="button" type="button" disabled={isSubmitting} onClick={this.onClickDeleteCancel}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default DeleteTask;
