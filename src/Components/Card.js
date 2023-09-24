import React from 'react'

import "../styles/karton.css"
const Card = ({pregled}) => {



const createDate=()=>{


  var date=pregled.vremePregleda.split('T');
  var vreme=date[0];
  var sati=date[1].slice(0,5);
var konacnoVreme=vreme+" "+sati+"h";
  return konacnoVreme;
}
  return (

    <div >
 <div  className='swiper-slide product-card'>
      <div className='product-image'>
               
                   <p style={{fontSize:'1.1rem',color:"black"}} className='anam'><span style={{fontSize:'1.1rem'}} className='id2'>Anamneza:</span>{pregled.anamneza}</p>

                   <p className='anam' style={{fontSize:'1.1rem'}} ><span style={{fontSize:'1.1rem'}} className='id2'>Dijagnoza:</span>{pregled.dijagnoza}</p>
                   <p className='anam' style={{fontSize:'1.1rem'}} ><span style={{fontSize:'1.1rem'}} className='id2'>Terapija i dalje lečenje:</span>{pregled.terapija}</p>


        </div>
                 <div className='product-info'>
                 <p className='product-short-description'>Izvršio pregled:<span className='id2'>Dr. {pregled.lekar.ime} {pregled.lekar.prezime} </span></p>
                 <p className='product-short-description'>Pregled održan <span className='id2'> </span> <span className='id2'> {createDate()}</span></p>
                 </div>
 
                  </div>

                  </div>


    
  )
}

export default Card