
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import ProductItem from "./productItem";
import { FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import DiscountCard from './discountCard'
import { useDispatch, useSelector } from "react-redux";
import { getProductFromApi } from "../../reduxToolKit/productSlice";
import store from "../../reduxToolKit/mainStore";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const FeshionSection = () => {
    const [categoryToggle, setCategoryToggle] = useState(false)
    const [genderToggle, setGenderToggle] = useState(false)
    const [discountToggle, setDiscountToggle] = useState(false)
    const [ratingToggle, setRatingToggle] = useState(false)
    const [brandToggle, setBrandToggle] = useState(false)
    const [sizeToggle, setSizeToggle] = useState(false)
    const [colorToggle, setColorToggle] = useState(false)
    const [availibilityToggle, setAvailibilityToggle] = useState(false)
    const [filterbar, setFilterbar] = useState(false)
    const [seatchValue, setseatchValue] = useState("")
    const [searchProduct, setSearchProduct] = useState([])

    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const products = useSelector((store) => store.products)



    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
            easing: "ease-in-out", // Easing function
        });
    }, []);
    // =====filter========
    const [malecheck, setMaleCheck] = useState(false)
    const [femalecheck, setFemaleCheck] = useState(false)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await dispatch(getProductFromApi()).unwrap();
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    console.log("product", products.products)
    const searchproductFun = (value) => {

        const filteredProducts = products.products.filter((p) =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchProduct(filteredProducts)

    }
    const genderBaseFilter = (value) => {
        console.log("sdjfbfigb", value)
        const filteredProducts = products.products.filter((p) =>
            p.brand.toLowerCase().includes(value.toLowerCase())
        );
        //   console.log("fdfjghsbdifhvbdfjkb", filteredProducts)
        setSearchProduct(filteredProducts)

    }
    //  
    return (
        <div className="p-3 d-flex responsive-slider w-100" style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', cursor: 'pointer' }} >
            <aside data-aos="fade-right" id={filterbar ? 'asideSilde' : ""} className=" aside px-4  d-flex justify-content-start align-items-start flex-column  gap-3 bg-white "

                style={{ width: '20% ', background: '' }}>
                <div className="d-flex justify-content-around align-items-center w-100 my-4">
                    <p className="p-0 m-0 fw-bold fs-4">Filters</p >
                    <button className="p-2  m-0 fw-bold  btn text-secondary " style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' }}>Clear All</button >
                </div>
                <div onClick={() => { setCategoryToggle(!categoryToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">CATEGORIES</p >
                    <div >
                        {categoryToggle ? <RiArrowDropDownLine Up Line className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>




                </div>
                <div className="d-flex justify-content-start w-100 " style={{ transition: "all 1s", cursor: 'pointer' }} >
                    {categoryToggle ?
                        <div style={{ transition: "all 1s" }}>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0  ps-2">Electronic</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Fashion</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Kilos</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Mobile</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Home & furcture</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Ap p liances</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">flite booking</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Beauty, toy and more</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Two wheelers</p >
                            </div>

                        </div>
                        : <div></div>}
                </div>
                <div onClick={() => { setGenderToggle(!genderToggle) }} className="FILTER_ITEM  d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0 FILTER_ITEM ">GENDER</p >
                    <div >
                        {genderToggle ? <RiArrowDropDownLine Line className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>




                </div>
                <div className="d-flex justify-content-start w-100 me-5 filterSmothAnimation"
                    style={{
                        cursor: 'pointer'
                    }} >
                    {genderToggle ?
                        <div>
                            <div

                                className="d-flex justify-content-start align-items-center me-5">
                                <input type="checkbox"
                                id="MALE"
                                    checked={malecheck}
                                    onClick={async () => {

                                        femalecheck ? setFemaleCheck(!femalecheck) : setFemaleCheck(femalecheck)

                                        await setMaleCheck(!malecheck)
                                        await malecheck ? genderBaseFilter("") : genderBaseFilter("boys")


                                    }}
                                />
                                <label htmlFor="MALE" className="p-0 m-0 ps-2">Male</label >
                            </div>
                            <div

                                className="d-flex justify-content-start align-items-center">
                                <input
                                id="FEMALE"
                                    checked={femalecheck}
                                    onClick={async () => {

                                        await setFemaleCheck(!femalecheck)
                                        malecheck ? setMaleCheck(!malecheck) : setMaleCheck(malecheck)
                                        await femalecheck ? genderBaseFilter("") : genderBaseFilter("girls")


                                    }}
                                    //  {}
                                    type="checkbox" />
                                <label htmlFor="FEMALE" className="p-0 m-0 ps-2 FILTER_ITEM ">Female</label >
                            </div>


                        </div>
                        : <div></div>
                    }
                </div>
                <div onClick={() => { setDiscountToggle(!discountToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">DISCOUNT</p >
                    <div >
                        {discountToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>




                </div>
                <div className="d-flex justify-content-start w-100 me-5" >

                    {discountToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">70% or more </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">40% or more</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">30% or more </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">20% or more</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">50% or more</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p -0 m-0 p s-2">60% or more </p >
                            </div>


                        </div>
                        : <div></div>}
                </div>
                <div onClick={() => { setRatingToggle(!ratingToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">CUSTOMER RATING </p >
                    <div >
                        {ratingToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>

                </div>
                <div className="d-flex justify-content-start w-100 me-5" >

                    {ratingToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="1*" className="form-check" />
                                <p htmlfor className="p-0 m-0 ps-2">1*+ rating </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="2*" className="form-check" />
                                <p className="p-0 m-0 ps-2">2*+ rating</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="3*" className="form-check" />
                                <p className="p-0 m-0 ps-2">3*+ rating </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="4*" className="form-check" />
                                <p className="p-0 m-0 p s-2">4*+ rating</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">5*+  rating</p >
                            </div>



                        </div>
                        : <div></div>}
                </div>
                <div onClick={() => { setBrandToggle(!brandToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">BRAND</p >
                    <div >
                        {brandToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>

                </div>
                <div className="d-flex justify-content-start w-100 me-5">
                    {brandToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="1*" className="form-check" />
                                <p htmlfor className="p-0 m-0 ps-2">1*+ rating </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="2*" className="form-check" />
                                <p className="p-0 m-0 ps-2">2*+ rating</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="3*" className="form-check" />
                                <p className="p-0 m-0 ps-2">3*+ rating </p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="4*" className="form-check" />
                                <p className="p-0 m-0 p s-2">4*+ rating</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">5*+  rating</p >
                            </div>



                        </div>
                        : <div></div>}
                </div>
                <div onClick={() => { setSizeToggle(!sizeToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">SIZE</p >
                    <div >
                        {sizeToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>

                </div>
                <div className="d-flex justify-content-start w-100 me-5">
                    {sizeToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="1*" className="form-check" />
                                <p htmlfor className="p-0 m-0 ps-2">2XS</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="2*" className="form-check" />
                                <p className="p-0 m-0 ps-2">XS</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="3*" className="form-check" />
                                <p className="p-0 m-0 ps-2">S</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="4*" className="form-check" />
                                <p className="p-0 m-0 ps-2">M</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">XL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">XXL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">XXXL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">4XL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">5XL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">6XL</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">7XL</p >
                            </div>




                        </div>
                        : <div></div>}
                </div>
                <div className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">PRICE</p >
                    <input type="range" />

                </div>
                <div onClick={() => { setColorToggle(!colorToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">COLOUR</p >
                    <div >
                        {colorToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>

                </div>
                <div className="d-flex justify-content-start w-100 me-5">
                    {colorToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="1*" className="form-check" />
                                <p htmlfor className="p-0 m-0 ps-2">Blue</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="2*" className="form-check" />
                                <p className="p-0 m-0 ps-2">Red</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="3*" className="form-check" />
                                <p className="p-0 m-0 ps-2">Black</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="4*" className="form-check" />
                                <p className="p-0 m-0 ps-2">Green</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">white</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">Brown</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">Dark blue</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">Dark green</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">Yellow</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">Pink</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" name='rating' value="5*" className="form-check" />
                                <p className=" p -0 m-0 ps-2">deep blue</p >
                            </div>




                        </div>
                        : <div></div>}
                </div>
                <div onClick={() => { setAvailibilityToggle(!availibilityToggle) }} className="d-flex justify-content-between align-items-start w-100">
                    <p className="fw-bold p -0 m-0">Availability</p >
                    <div >
                        {availibilityToggle ? <RiArrowDropDownLine className="fs-2" /> : <RiArrowDropUpLine className="fs-2" />}
                    </div>

                </div>
                <div className="d-flex justify-content-start w-100 me-5"  >
                    {availibilityToggle ?
                        <div>
                            <div className="d-flex justify-content-start align-items-center me-5">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">Only out of stock include</p >
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <input type="checkbox" />
                                <p className="p-0 m-0 ps-2">only stock include</p >
                            </div>


                        </div>
                        : <div></div>
                    }
                </div>
            </aside>
            <div className="products d-flex justify-content-center align-items-start gap-5 px-3 flex-wrap"
                style={{ width: '80% ', background: '' }}>
                <div className="d-flex w-100 justify-content-center align-items-center " >
                    <div className="w-100 position-relative">

                        <input data-aos="fade-left" type="text" className=" w-100 product-search-input ps-5 "
                            placeholder="Search the product "
                            value={seatchValue}
                            onChangevh={(e) => {
                                setseatchValue(e.target.value)
                                searchproductFun(seatchValue)
                            }} />
                        <FaSearch className="position-absolute top-0 start-0 ms-3 mt-3 text-secondary fs-5" />
                    </div>

                    <button onClick={() => { setFilterbar(!filterbar) }} className="btn d-flex justify-content-center align-items-center ms-2 ">
                        <FaFilter className=" fs-4" />
                    </button>


                </div>
                {searchProduct.length >= 1 ?
                    searchProduct?.map((p, index) => (
                        <ProductItem
                            className=' fade-in'
                            key={index}
                            productId={p.id}
                            image={p.image}
                            name={p.name}
                            desc={p.description}
                            price={p.price}
                            offer={p.offer}
                            delivery={!p.isFreeDelevary}
                            rating={p.rating}
                        />
                    ))
                    : products.products?.map((p, index) => (
                        <ProductItem
                            className=' fade-in'
                            onClick={() => {
                                nevigate(`/product/${p.id}`)
                            }}
                            key={index}
                            productId={p.id}

                            image={p.image}
                            name={p.name}
                            desc={p.description}
                            price={p.price}
                            offer={p.offer}
                            delivery={p.isFreeDelevary}

                            rating={p.rating}
                        />
                    ))}


            </div>
        </div>
    )
}
export default FeshionSection