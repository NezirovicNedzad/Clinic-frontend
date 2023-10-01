import React from "react";

import "../../styles/karton.css";
const CardKarton = ({ napomene }) => {
  return (
    <div>
      <div className='swiper-slide product-card'>
        <div className='product-image' style={{ paddingTop: "0px" }}>
          <p style={{ fontSize: "1.1rem", color: "black" }} className='anam'>
            <span style={{ fontSize: "1.1rem" }} className='id2'>
              Primedba:{" "}
            </span>
            {napomene.primedba}
          </p>

          <p className='anam' style={{ fontSize: "1.1rem" }}>
            <span style={{ fontSize: "1.1rem" }} className='id2'>
              Neželjeno dejstvo:{" "}
            </span>
            {napomene.nezeljenoDejstvo}
          </p>
        </div>
        <div className='product-info'>
          <p className='product-short-description'>
            Napomenu napisala:{" "}
            <span className='id2'>
              {napomene.sestra.ime} {napomene.sestra.prezime}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardKarton;
