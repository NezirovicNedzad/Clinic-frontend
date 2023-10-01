import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import CardKarton from "../Sestra/CardKarton";
import "../../styles/novi.css";

const SliderNapomena = ({ napomene }) => {
  const settings = {
    dots: false,

    infinite: true,
    spacebetween: 100,
    variableWidth: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='novi2'>
      <Slider {...settings}>
        {napomene.map((napomena) => (
          <div
            key={napomena.id}
            style={{ height: "700px", marginRight: "10rem" }}
          >
            <CardKarton napomene={napomena} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderNapomena;
