import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {

  createOrder
} from '../../helpers/userFetch';
import { isAuthenticated } from '../../helpers/authFetch';
import { emptyCart, getCart } from '../../helpers/cart';

const Checkout = ({ products, setRender = f => f, render = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  

  

  const getTotal = () => {
  
    return products.reduce((currentValue, nextValue) => {
      return Math.round(currentValue + nextValue.count * nextValue.price);
    }, 0);
  };
  const individualItem=()=>{
    const products_cart=getCart()
  
    return (
      <div>
        <table className="styled-table" style={{border: '1px solid black'}}>
        <th>
         Name
         </th>
         
         <th>
         Quantity
         </th>
         <th>
         
           Cost
         </th>
  {products_cart.map(p=>(
   <tr>
     
       <td>
       {p.name}
         </td>
         <td>
         {p.count}
         </td>
         <td>
         {p.count*p.price}
         </td>

         
        
        
   
</tr>
    
    )
  )
  }
   </table>
  
</div>
    )
  

}


  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn bg-dg f-white">Sign in here</button>
      </Link>
    );
  };

  const buy = () => {

    if(!data.address||data.address=='') 
    {
      alert('Please enter delivery address');
      return
    }
   
    setData({ loading: true });
    
    let nonce;
  
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

      
          
            setData({ ...data, success:true});
            
            const createOrderData = {
              products: products,
              transaction_id:Math.random(),
              amount: getTotal(products),
              address: data.address
            };
            createOrder(userId, token, createOrderData);
           
            emptyCart(() => {
              setRender(!render); 
              
              setData({ loading: false, success: true });
            });
          alert('Your order has been placed succesfully. Thanks for your payment');
          ;
     
    
  };

  const handleAddress = e => {
    setData({ ...data, address: e.target.value });
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })} className="w-50 m-auto">
      {  products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery Address:</label>
            <textarea required className="form-control" placeholder="Enter here" value={data.address} onChange={handleAddress}
            ></textarea>
          </div>
          
          <button onClick={buy} className="btn bg-dg f-white btn-block pt-2">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = loading =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container-fluid ">
      <center>
      {products.length>0&&
      <div>
      {individualItem()}
      </div>}
      </center>
      {products.length>0&&<h2>Total: ${getTotal(products)}</h2>}
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
