import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () =>
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });

  useEffect(() => {
    loadCategories();
    
  }, []);

  const deleteCategoryButton = categoryId => {
    deleteCategory(user._id, token, categoryId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  return (
    <div className="container w-50 bg-g borderStyle p-3">
      <h1 className="title m-3 text-center">Manage Categories</h1>
      
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {categories.map(c => (
              <li className="list-group-item my-1 borderStyle" key={c._id} >
                <strong className="float-left">{c.name}</strong>
                <div className="float-right">
                  <Link to={`/admin/category/update/${c._id}`} className="borderStyle p-1">
                    
                      Update
                   
                  </Link>
                     
                  <Link to={`/admin/categories`}>
                    <span
                      className='m-2 borderStyle p-1'
                      style={{color:'red'}}
                      onClick={() => deleteCategoryButton(c._id)}
                    >
                      Delete
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
