import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  getOrders,
  getStatusValues,
  updateOrderStatus
} from '../../helpers/adminFetch';
import {Accordion, Container} from 'react-bootstrap'
import { isAuthenticated } from '../../helpers/authFetch';
import { Link, withRouter } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();

    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="">{key}:-  </div>
      </div>
      <span>{value}</span>
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then(res => {
      if (res.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };
  const showStatus = order => (
    <div className="form-group">
      <h4 className="mark mb-2">Status: {order.status}</h4>
      <select
        className="form-control"
        onChange={e => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, i) => (
          <option key={i} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );



  return (
    <div>
      <Container>
      <h1 className="text-center mt-2 title">Total orders: {orders.length}</h1>
    
      {orders.map((o,i) => {
          
        return (
          <div>
         
          <Accordion defaultActiveKey="0" className="py-2">
          <Accordion.Item eventKey={o._id}>
          <Accordion.Header style={{marginBottom:'5px'}}>{`Order no:  ${o._id}`}</Accordion.Header>
            <Accordion.Body>
          <div className="row m-2 my-5 p-2 order" key={o._id} style={{border: '1px solid black'}}>
            <div className="col-6">
              <h4 className="mb-3 text-primary">
             
                <span className="f-black" >Order ID: {o._id}</span>
               
              </h4>

              <ul className="list-group mb-2 borderStyle">
                <li className="list-group-item ">{showStatus(o)}</li>
                <li className="list-group-item">
                  Transaction ID: {o.transaction_id}
                </li>
                <li className="list-group-item">Amount: ${o.amount}</li>
                <li className="list-group-item">Ordered by: {o.user.name}</li>
                <li className="list-group-item">
                  Ordered on: {moment(o.createdAt).fromNow()}
                </li>
                <li className="list-group-item">
                  Delivery address: {o.address}
                </li>
              </ul>
            </div>
            <div className="col-6 m-auto">
              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order: {o.products.length}
              </h3>
              {o.products.map(p => (
                <div key={p._id} className="order_products bg-dg f-white borderStyle m-2">
                  {showInput('Name', p.name)}
                  {showInput('Price', `$${p.price}`)}
                  {showInput('Count', p.count)}
                  
                </div>
              ))}
            </div>
           
          </div>
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </div>
      
        );
      })
   
      
      }


      </Container>
    </div>
    
  );
};

export default Orders;
