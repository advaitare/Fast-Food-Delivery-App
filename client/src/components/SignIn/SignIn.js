import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../../helpers/authFetch';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };


  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
     
      <button onClick={clickSubmit} className="btn bg-dg f-white">
        Login
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  const informParent = response => {
    authenticate(response, () => {
      setValues({
        ...values,
        redirectToReferrer: true
      });
    });
  };

  return (
    <div className="container w-50 bg-g borderStyle p-3 mt-5">
      <center>
      <h1 className="title">Sign In</h1>
      </center>
      {showLoading()}
      {showError()}
      <div className="text-center">
      
      </div>

      {signUpForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
