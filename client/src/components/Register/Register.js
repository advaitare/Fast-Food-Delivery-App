import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../helpers/authFetch';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: false
  });

  const { name, email, password, confirmPassword, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setValues({ ...values, error: 'Password do not match' });
    } else {
      setValues({ ...values, error: false });
      signup({ name, email, password }).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            success: true
          });
        }
      });
    }
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

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

      <div className="form-group">
        <label className="text-muted">Confirm Password</label>
        <input
          onChange={handleChange('confirmPassword')}
          type="password"
          className="form-control"
          value={confirmPassword}
        />
      </div>
     

      <button onClick={clickSubmit} className="btn bg-dg f-white py-3">
        Submit
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to="/signin">Sign In</Link>
    </div>
  );

  return (
    <div className="container w-50 bg-g borderStyle p-5">
      <center>
      <h1 className="title">Register here</h1>
      </center>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </div>
  );
};

export default Register;
