import React from "react";
import "../css/Carousel.css"
import r1 from "../pictures/recom3.jpg";
import Hover from "./Hover";
import { useEffect, useState } from "react";
import CustomPopup from "./CustomPopUp";
const Image = ({title,duration,rating,image}) => {
    const [hovervisibility,sethover]=useState(false);

        const popupClose =() =>
        {
          sethover(false);
        };

        const [visibility, setVisibility] = useState(false);

        const popupCloseHandler = () => {
          setVisibility(false);
        };
    return (
       
      <>
         <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
      >
      </CustomPopup>  
         <img onClick={() => setVisibility(true)} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)} src={image}></img>
        
         <Hover 
          visible={hovervisibility} showhover={hovervisibility}
          titlu={title} durata={duration} rate={rating}  
        ></Hover>
       
        </>
    );
  };
  
  export default Image;