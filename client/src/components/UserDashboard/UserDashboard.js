import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { isAuthenticated } from '../../helpers/authFetch';
import { getPurchaseHistory } from '../../helpers/user';
import { Accordion , Container} from 'react-bootstrap';
import {
  getUser,
  updateUser,
  updateUserLocalStorage
} from '../../helpers/user';
const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [values, setValues] = useState({
    name: '',
    email: '',
error:''
  });

  const {
    user: { name, email, role, _id }
  } = isAuthenticated();
  const token = isAuthenticated().token;


  useEffect(() => {
    getPurchaseHistory(_id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  }, []);


  useEffect(() => {
    getUser(_id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  }, []);


  const userInfo = () => {
    return (
      <div className="card mb-5 card-dashboard bg-g">
        <h3 className="card-header bg-dg f-white">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{values.name}</li>
          <li className="list-group-item">Email:&nbsp;{values.email}</li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
      <div className="card mb-5 bg-g">
        <h3 className="card-header bg-dg f-white">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h,i) => {
              return (
                <div>
                

                <Accordion defaultActiveKey="0" className="py-2">
                  <Accordion.Item eventKey={h._id}>
                  <Accordion.Header>{`Order no:  ${h._id}`}</Accordion.Header>
                    <Accordion.Body>
                      <div key={h._id}>

                        <h3>Total Products:&nbsp;{h.products.length}</h3>
                        
                        <hr />
                        {h.products.map(p => {
                          return (


                            <div key={p._id}>
                              <h6>Name: {p.name}</h6>
                              <h6>Price: ${p.price}</h6>
                              <h6>Count:{p.count}</h6>
                              <h6>Cost:{p.count*p.price}</h6>
                              <hr />
                            </div>




                          );
                        })}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </div>
              );
            })}

          </li>
        </ul>
      </div>

    );
  };

  return (
    
    <Container className=" py-5">
    <div className="row p-5 card-container bg-g borderStyle ">
      
      <div className="col-8">
        {userInfo()}
        {purchaseHistory(history)}
      </div>
    </div>
    </Container>
   
  );
};

export default UserDashboard;
