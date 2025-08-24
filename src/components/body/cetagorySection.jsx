import { useEffect } from "react"
import CetagoryItem from "./cetagoryItem"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../../reduxToolKit/catagorySlice"
import store from "../../reduxToolKit/mainStore"

const Cetagory = ()=>{
    const dispatch=useDispatch()
    const categories=useSelector((store)=>store.category.category)
    useEffect(()=>{
        dispatch(getCategory())
    }, [dispatch])


    return (
       
        <div className=" d-flex justify-content-center align-items-center gap-5 my-2     category" style={{ overflowX:'scroll'}}>
           {categories?.map((ceta) => (
    
            <CetagoryItem image={ceta.image} text={ceta.name} />
))}

           
        </div>
    )
}
export default Cetagory