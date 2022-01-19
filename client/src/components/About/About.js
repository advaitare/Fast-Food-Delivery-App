import React from 'react';
import { Row,Col } from 'react-bootstrap';

const About = () => {
  return (

    <div className="col-md-6 offset-md-3">
      <div></div>
      <div className="about_container">
        <img src="images/Fastfood.jpg" alt="background_img" width='100%' height='100%' className="img_abt"></img>
        <div className="bottom-right"><h4>How FastEats works</h4></div>
      </div>

      <h4 className="pt-4 pb-3 text-center"></h4>

      <hr />
      <div>
        <h3>How to use the FastEats app</h3>
        <Row>
          <Col>
          <div className="card1">
          <img src="images/images.jfif" alt="background_img" width='100%' height='100%'></img>
          <div className="container1">
            <p><b>Browse</b></p>
            <p>FastEats has a variety of menu to choose from. When you open the app, you can scroll through for inspiration or search for a particular cuisine. When you find something you like, tap to add it to your order.</p>
          </div>


        </div>
          </Col>
          <Col>
          <div className="card2">
          <img src="images/background.jpeg" alt="background_img" width='100%' height='100%'></img>
          <div className="container1">
          <p><b>Order</b></p>
            <p>When you’re ready to check out, you’ll see your address, and the price of the order including tax and delivery fee. When everything looks right, just tap Place order—and that’s it.</p>
          </div>
            
        </div>
          </Col>
          <Col>
          <div className="card3">
          <img src="images/Vada-Pav.jpg" alt="background_img" width='100%' height='100%'></img>
          <div className="container1">
          <p><b>Eat</b></p>
            <p>Once you've ordered the food you crave, sit back and relax while we deliver it to your door step!</p>
          </div>
            
        </div>
          </Col>
        </Row>


      </div>


    </div>
  );
};

export default About;



       

       