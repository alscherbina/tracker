/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from '../axios-tasks';

export default class AddTask extends Component {
  state = {
    taskEditModalActive: false
  };

  formInitialValues = {
    url: '',
    title: '',
    schedule: ''
  };

  toggleModal = e => {
    e.preventDefault();
    this.setState(prevState => ({ taskEditModalActive: !prevState.taskEditModalActive }));
  };

  formSubmit = async (values, formikbag) => {
    try {
      const result = await axios.post('/tasks', values);
      formikbag.setSubmitting(false);
      console.log(result);
    } catch (error) {
      formikbag.setSubmitting(false);
      console.log(error);
    }
  };

  render() {
    const { taskEditModalActive } = this.state;
    let modal = null;
    if (taskEditModalActive) {
      modal = (
        <Formik
          onSubmit={this.formSubmit}
          initialValues={this.formInitialValues}
          render={props => <TaskForm toggleModal={this.toggleModal} {...props} />}
        />
      );
    }
    return (
      <div className="level">
        <button className="button is-danger level-item" type="button" onClick={this.toggleModal}>
          Add Task
        </button>
        {modal}
      </div>
    );
  }
}

const TaksFormField = ({ type, name, label, placeholder, selectValues }) => {
  let control = null;
  switch (type) {
    case 'input':
      control = <Field name={name} placeholder={placeholder} className="input" />;
      break;
    case 'select':
      control = (
        <div className="select">
          <Field name={name} component="select">
            <option value="" label={placeholder} />
            {selectValues.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </Field>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">{control}</div>
    </div>
  );
};

const TaskForm = ({ toggleModal, errors, status, touched, isSubmitting, handleSubmit }) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={toggleModal} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Add Task</p>
        <button className="delete" aria-label="close" type="button" onClick={toggleModal} />
      </header>
      <section className="modal-card-body">
        <Form>
          <TaksFormField
            name="type"
            type="select"
            label="Task Type"
            placeholder="Choose Type"
            selectValues={['rozetka', ['custom']]}
          />
          <TaksFormField name="url" type="input" label="Page URL" placeholder="URL" />
          <TaksFormField name="title" type="input" label="Task Title" placeholder="Title" />
          <TaksFormField name="schedule" type="input" label="Schedule" placeholder="Cron expression" />
          <input type="submit" className="is-invisible" />
        </Form>
      </section>
      <footer className="modal-card-foot">
        <button
          className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
          type="button"
          onClick={handleSubmit}
        >
          Save changes
        </button>
        <button className="button" type="button" onClick={toggleModal}>
          Cancel
        </button>
      </footer>
    </div>
  </div>
);
