import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Card as Cards} from 'react-bootstrap' 
import Images from './Images';
import moment from 'moment';
import { addItem, updateItem, removeItem } from '../../helpers/cart';

const Card = ({
  cart,
  product,
  showViewButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRender = f => f,
  render = undefined
}) => {
  const [count, setCount] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const showViewProductButton = showViewButton => {
    return (
      showViewButton &&  (
        cart?'':<Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-light borderStyle mt-2 mb-2">View</button>
        </Link>
      )
    );
  };


  const addToCart = () => {
    addItem(product, () => {
      
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          className="btn btn-dark mt-2 mb-2"
          onClick={addToCart}
        >
          Add to cart
        </button>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          className="btn btn-outline-danger mt-2 mb-2"
          onClick={() => {
            removeItem(product._id, () => setRedirect(true));
            setRender(!render); 
          }}
        >
          Remove
        </button>
      )
    );
  };


  const handleChange = productId => e => {
    setRender(!render); 
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mt-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count>1?count:product.count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  return (
    <Cards className="product">
      <div className="card-header">{product.name}</div>
      <div className="card-image">
        {shouldRedirect(redirect)}
        <center>
        {cart?'':(<Images item={product} />)}
        </center>
      </div>
      <div className="column card-body">
        {cart?'':<p>Description: {product.description.substring(0, 50)}</p>}
        <hr />
        <h5>Cost: ${product.price}</h5>
       
       
        <hr />
        

    
        <div>
          {showViewProductButton(showViewButton)}
          {showCartUpdateOptions(cartUpdate)}
          {showAddToCart(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </div>
        
      </div>
    </Cards>
  );
};

export default Card;
