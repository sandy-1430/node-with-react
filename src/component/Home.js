import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default function Home() {
    return (
       <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="images/hero-bg.jpg"
            alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="images/studentlogin.jpg"
            alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="images/hero-bg.jpg"
            alt="Third slide"
            />
        </Carousel.Item>
        </Carousel>
    )
}
