import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { listKartona } from "../actions/kartonActions";
import Card from "./Card";
import { useParams } from "react-router";
import "../styles/novi.css";

const SlickReactSlider = ({ pregledi }) => {
  const dispatch = useDispatch();

  const kartoniList = useSelector((state) => state.kartoniList);

  //   const{loading:loadingK,error:errorK,karton,pregledi}=kartoniList;

  const pacijentDetails = useSelector((state) => state.pacijentDetails);

  const { loading, error, pacijent, lekar } = pacijentDetails;
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
        {pregledi.map((pregled) => (
          <div
            key={pregled.id}
            style={{ height: "700px", marginRight: "10rem" }}
          >
            <Card pregled={pregled} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickReactSlider;
