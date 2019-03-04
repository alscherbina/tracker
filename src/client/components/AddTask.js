/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from '../axios-tasks';
import * as Yup from 'yup';

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
          validationSchema={TaskSchema}
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

const TaskSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  url: Yup.string()
    .required('Required')
    .url(),
  title: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  schedule: Yup.string().required('Required')
});

const TaskSelectField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  selectValues,
  placeholder,
  ...props
}) => {
  let error = null;
  if (touched[field.name] && errors[field.name]) {
    error = <p className="help is-danger">{errors[field.name]}</p>;
  }
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select {...field} {...props}>
            <option value="" label={placeholder} />
            {selectValues.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error}
    </div>
  );
};

const TaskInputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  ...props
}) => {
  let error = null;
  if (touched[field.name] && errors[field.name]) {
    error = <p className="help is-danger">{errors[field.name]}</p>;
  }
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input type="text" {...field} {...props} className="input" />
      </div>
      {error}
    </div>
  );
};

const TaskForm = ({ toggleModal, isSubmitting, handleSubmit }) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={toggleModal} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Add Task</p>
        <button className="delete" aria-label="close" type="button" onClick={toggleModal} />
      </header>
      <section className="modal-card-body">
        <Form>
          <Field
            name="type"
            type="select"
            label="Task Type"
            placeholder="Choose Type"
            selectValues={['rozetka', ['custom']]}
            component={TaskSelectField}
          />
          <Field name="url" placeholder="URL" label="Page URL" component={TaskInputField} />
          <Field name="title" placeholder="Title" label="Task Title" component={TaskInputField} />
          <Field name="schedule" placeholder="Cron expression" label="Schedule" component={TaskInputField} />
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
