import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='footer'>
        <Row>
          <Col>
            <p class="text-center">Follow us: 
              <a class="social-icon" href="#"><i class="fab fa-facebook fa-lg"></i></a> 
              <a class="social-icon" href="#"><i class="fab fa-instagram fa-lg"></i></a></p>
              </Col>
         <Col>
            <p class="text-center">Copyright &copy; 2021</p>
            </Col>
          <Col>
            <p class="text-center">Powered by: <a href="#">Fast Eats Inc. </a></p>
          </Col>
          
        
        </Row>
    </footer>
  )
}

export default Footer
