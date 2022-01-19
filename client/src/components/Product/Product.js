import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../../helpers/userFetch';
import Card from '../Home/Card';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { setError } = useState(false);

  useEffect(() => {
    const productId = match.params.productId;
    getSingleProduct(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        
      }
    });
  }, []);

 
  return (
    <>
      <div className="m-2 d-flex justify-content-center">
        <div className="col-6">
          {product && product.description && (
            <Card product={product} showViewButton={false} />
          )}
        </div>
      </div>
     
    </>
  );
};

export default Product;
