/* eslint-disable react/prop-types */
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import * as actions from '../store/actions';
import axios from '../axios-tasks';

class SignInForm extends Component {
  formSubmit = async (values, formikbag) => {
    try {
      await axios.post('/login', { ...values });
      formikbag.setSubmitting(false);
      formikbag.setStatus({ submitted: true });
      const { cookies, signIn } = this.props;
      cookies.set('signedIn', true, { path: '/' });
      signIn();
    } catch (error) {
      formikbag.setSubmitting(false);
      formikbag.setStatus({ msg: 'Wrong user name or password' });
    }
  };

  componentDidMount = () => {
    const { cookies, signIn, signOut } = this.props;
    const signedIn = cookies.get('signedIn');
    if (signedIn === 'true') {
      signIn();
    } else {
      signOut();
    }
  };

  render() {
    const form = { id: '', password: '' };
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-4 is-offset-4">
            <Formik
              initialValues={form}
              onSubmit={this.formSubmit}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="field">
                    <div className="control">
                      <Field type="input" name="id" className="input" placeholder="Username" />
                      <ErrorMessage name="id" component="div" />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <Field type="password" name="password" className="input" placeholder="Password" />
                      <ErrorMessage name="password" component="div" />
                    </div>
                  </div>
                  {status && status.msg && <div>{status.msg}</div>}
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button type="submit" className="button is-info" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signedIn: state.auth.signedIn
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(actions.signIn()),
  signOut: () => dispatch(actions.signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(SignInForm));
