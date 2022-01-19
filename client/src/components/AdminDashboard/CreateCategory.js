import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createCategory } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="" className="text-muted f-white">
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          autoFocus
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <Link
        to="/admin/dashboard"
        className="btn bg-dg f-white mx-2"
      >
        Back
      </Link>
      <button className="btn bg-dg f-white">Create</button>
    </form>
  );

  const showSuccess = () => {
    if (success)
      return <h3 className="text-success"> Category is created successfully!</h3>;
  };

  const showError = () => {
    if (error) return <h3 className="text-danger">{error}</h3>;
  };

  return (
    <div className="container w-50 bg-g borderStyle p-3 ">
      <h1 className="title m-3 text-center">Create New Food Category</h1>
      {showError()}
      {showSuccess()}
      {newCategoryForm()}
    </div>
  );
};

export default CreateCategory;
