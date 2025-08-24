import { useNavigate } from 'react-router-dom'
import '../../index.css'
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from 'react';

const DiscountCard= ({ productId="",  offer='', name="", image=""})=>{
    const nevigate=useNavigate()
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true, // Whether animation should happen only once
          easing: "ease-in-out", // Easing function
        });
      }, []);
    
    return(
<div data-aos="fade-up" id="discountCard" className="container-fluid mt-2 " onClick={()=>{
            console.log("this is the product page ")
            nevigate(`/product/${productId}`)
        }}>
 

    <div   class="discount-card  d-flex">
        <div className="discount-text my-4">
            <h4>{name.length>=25?name.slice(0,23)+"...":name}</h4>
            <h3 className="fw-bold">{offer}-{parseInt(offer)+20}% Off</h3>
            <p>Woodland, Abros & more <br/> Don't miss these savings!</p>
        </div>
        <img src={image} alt="Shoes" className="img-fluid" style={{width:'100px ', height:"100px", margin:'2rem 4rem'}}/>
    </div>
</div>
    )
}
export default DiscountCard;