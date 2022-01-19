import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { isAuthenticated } from '../../helpers/authFetch';
import {
  getUser,
  updateUser,
  updateUserLocalStorage
} from '../../helpers/user';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();
  useEffect(() => {
    getUser(match.params.userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    updateUser(match.params.userId, token, { name, email, password }).then(
      data => {
        if (data.error) {
          alert(data.error);
        } else {
          updateUserLocalStorage(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true
            });
          });
        }
      }
    );
  };

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      Your profile has been updated successfully!
    </div>
  );

  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      Fail to update your profile
    </div>
  );

  const updateForm = () => (
    <form >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type="password"
          className="form-control"
        />
            <button className="btn bg-dg f-white my-3" onClick={clickSubmit}>
          Update
        </button>
      </div>

     
    
      
    </form>
  );

  return (
    <Container className="bg-g borderStyle">
    <div className="container ">
      <h1 className="title m-3 bg-dg f-white p-3 borderStyle">Edit Profile </h1>
      {showSuccess(success)}
      {showError(error)}
      {updateForm()}
    </div>
    </Container>
  );
};

export default Profile;
