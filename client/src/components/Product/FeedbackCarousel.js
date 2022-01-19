import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image,Container } from 'react-bootstrap'


const FeedbackCarousel = () => {



   return( <Carousel pause='hover' className='carousel '>
      
        <Carousel.Item >
      
     <Container className='feedbackDetails'>
      <h3> “The Food is Excellent.”</h3>
      <p>The food is excellent, generous portions and great prices. The service was fast and friendly. I highly recommended it </p>
    </Container>
         
        </Carousel.Item>
        
        <Carousel.Item >
        <Container className='feedbackDetails'>
            <center>
      <h3> “Affordably Priced”</h3>
      </center>
      <p>This place knows how to satisfy their clients. Always with a super nice mindset. The food is affordably priced, always delicious and clean..</p>
    </Container>
         
        </Carousel.Item>
        
        <Carousel.Item >
        <Container className='feedbackDetails'>
            <center>
      <h3> “Delicious”</h3>
      </center>
      <p>Pizza was delicious..will be back soon.</p>
    </Container>
         
        </Carousel.Item>
        <Carousel.Item >
        <Container className='feedbackDetails'>
            <center>
      <h3> “Family Friendly and Excellent Food”</h3>
      </center>
      <p>This restaurant is one of the best in town! The food is delicious and the location is great, lots of parking. Very clean and the pizza is awesome!!</p>
    </Container>
         
        </Carousel.Item>
     
    </Carousel>
   )
}

export default FeedbackCarousel
