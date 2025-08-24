import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css"; 

const CetagoryItem  = ({image, text})=>{
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true, // Whether animation should happen only once
          easing: "ease-in-out", // Easing function
        });
      }, []);
    return(
    <div data-aos="fade-up" style={{width:'100px', }}>
        
        <img src={image} alt="CatagoryItem" className="w-100 categoryImage " style={{height:"80px"}}/>
        <p className="p-0 m-0 categoryText" accordion
        style={{fontFamily:' font-family: "Anton SC", sans-serif'}}
        >{text}</p>
    </div>
    )
}
export default CetagoryItem;