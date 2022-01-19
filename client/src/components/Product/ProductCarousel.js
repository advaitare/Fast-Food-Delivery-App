import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image,Container } from 'react-bootstrap'

import { getProducts } from '../../helpers/userFetch';

const ProductCarousel = () => {

const [products,setProductByCreation]=useState([])
const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getProducts('createdAt').then(data => {
            if (data.error) {
              setError(data.error);
            } else {
              setLoading(false);
              setProductByCreation(data);
              
            }
          });
    },[])

  return  (
    <Carousel pause='hover' className='carousel' style={{marginTop:'30px'}}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={`/api/product/photo/${product._id}`} alt={product.name} height='100%' width='100%' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} 
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    
  )
}

export default ProductCarousel
