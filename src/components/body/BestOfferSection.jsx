import { useEffect, useState } from "react";
import store from "../../reduxToolKit/mainStore";
import DiscountCard from "./discountCard";
import { useSelector } from "react-redux";
function BestOffer(){
    const [bestProduct,setBestProduct]=useState([])
    const products=useSelector((store)=>store.products.products)
    useEffect(()=>{
        const BestOffer  = products?.filter((p) =>
            p.offer>=40);
        setBestProduct(BestOffer)
    },[products])
    console.log("this is best offter",bestProduct)
    
    return(
        <div className="py-5" style={{background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'}}>
            <h1 style={{textShadow:'1px 1px 2px black,0 0 1em blue,0 0 0.2em blue'}}>Best offer for you!</h1>
            <div className="container-fluid d-flex justify-content-center align-items-center flex-wrap  gap-2">
                {bestProduct?.map((p)=>
                (
                    
                    <DiscountCard key={p.id} productId={p.id} offer={p.offer} name={p.name} image={p.image}/>
                )

                )}
              
            </div>
        </div>
    )
}
export default BestOffer;