import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () =>
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });

  useEffect(() => {
    loadProducts();
   
  }, []);

  const deleteProductButton = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <div className="container w-50 bg-g borderStyle p-3">
      <h1 className="title m-3 text-center">Manage Existing Items</h1>
      
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {products.map(p => (
              <li className="list-group-item borderStyle my-1" key={p._id} style={{background:p.isDeleted?'#ffcccb':''}}>
                <strong className="float-left">{p.name}</strong>
                <div className="float-right">
                  <Link to={`/admin/product/update/${p._id}`} className="borderStyle p-1">
                    <span >
                      Update
                    </span>
                  </Link>

                  <Link to={`/admin/products`}>
                    <span
                                            className='m-2 borderStyle p-1'
                                            style={{color:'red'}}

                      onClick={() => deleteProductButton(p._id)}
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

export default ManageProducts;
