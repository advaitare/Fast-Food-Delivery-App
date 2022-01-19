import React, { useState, useEffect } from 'react';
import { getCart } from '../../helpers/cart';
import Card from '../Home/Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import {Row,Col} from 'react-bootstrap'

const Cart = () => {
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);
const [cart,setc]=useState(false)
  useEffect(() => {
    setItems(getCart());
    if(window.location.pathname.includes('cart'))
    {setc(true)}
  }, [render]);

  const showItems = items => {
 
    return (
      <div>
        <div className="row">
          {items.map(product => (
           
            <div className="col-4" key={product._id}>
              <Card
              cart
                product={product}
                showAddToCartButton={false}
                showRemoveProductButton={true}
                cartUpdate={true}
                setRender={setRender}
                render={render}
              />
            </div>
          ))}{' '}
        </div>
      </div>
    );
  };

const show=items=>{
  return (
    <div>
      <div className="row">
        {items.map(product => (
         
          <div className="col-4" key={product._id}>
            <Card
            cart
              product={product}
              showAddToCartButton={false}
              showRemoveProductButton={true}
              cartUpdate={true}
              setRender={setRender}
              render={render}
            />
          </div>
        ))}{' '}
      </div>
    </div>
  );

}


  const noItemsMessage = () => (
    <div>
      <h2 className="f-white">Your cart is currently empty.</h2>
      <Link to="/search">Continue ordering</Link>
    </div>
  );

  return (
    <div className="text-center m-3">
      <div className="">
      <h1 className="title p-2 borderStyle">CART DETAILS</h1>
      <Row>
        <Col>
      <div className="mt-4 bg-dg borderStyle p-2">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </div>
      </Col>
      {items.length>0&& <Col>
        <Checkout products={items} setRender={setRender} render={render} />
        </Col>}
       
        </Row>
      </div>

      
    </div>
  );
};

export default Cart;

