import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/userFetch';
import ProductCarousel from '../Product/ProductCarousel';
import FeedbackCarousel from '../Product/FeedbackCarousel';
import Card from './Card';
import { Carousel, Image,Container,Row,Col} from 'react-bootstrap'

const Home = () => {
 

  return (
    <Container>
      
     <ProductCarousel/>
     <Row className="py-5">
    <Col><img src='images/download.jpg' width='100%' height='100%' /></Col>
    <Col><FeedbackCarousel width='100%' height='100%' /></Col>
  </Row>
  <Container className='whyUs my-5'>
    <h2 className='text-center my-5'>Why fastEat</h2>
    <Row>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src='./images/fresh.jpg' width='90' height='90' />
        <p className='listTitle'>Fresh and unique</p>
        <p>We provide you with a unique variety of recipes using fresh ingredients</p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src='./images/dw.jpg' width='90' height='90' />
        <p className='listTitle'>Not Satisfied? Don't worry</p>
        <p>If you are not satisfied with the food we don't charge for the food </p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src='./images/1.png' width='90' height='90' />
        <p className='listTitle'>#1 in food services</p>
        <p>We have been reviewed and rated #1 at making recipes and delivering them to people</p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src='./images/fast.jpg' width='90' height='90' />
        <p className='listTitle'>Fast Service</p>
        <p>We provide meals to you ASAP so that you don't stay hungry</p>
      </Col>
    
    </Row>
  </Container>
    </Container>
  );
};

export default Home;
