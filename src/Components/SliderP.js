import React, { Component,useEffect } from "react";
import Slider from "react-slick";


export default class SimpleSlider extends Component {




  render() {
    const settings = {
      dots: false,
      innerWidtht:150,
      infinite: true,
      outerWidth:700,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div style={{width:"700px"}}>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}