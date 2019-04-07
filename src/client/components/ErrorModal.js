/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const ErrorModal = ({ error, hideError }) => {
  const result = error ? (
    <div className="modal is-active">
      <div className="modal-background" onClick={hideError} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Error</p>
          <button className="delete" type="button" aria-label="close" onClick={hideError} />
        </header>
        <section className="modal-card-body">{error.message}</section>
        <footer className="modal-card-foot">
          <button className="button" type="button" onClick={hideError}>
            Ok
          </button>
        </footer>
      </div>
    </div>
  ) : null;
  return result;
};

const mapStateToProps = state => ({
  error: state.general.error
});

const mapDispatchToProps = dispatch => ({
  hideError: () => dispatch(actions.generalHideError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);
