import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = 'https://ecommerce-backend-mrre.onrender.com/api/wishlist/'

export const addProductToWishList = createAsyncThunk('wishlists/addProductToWishList', async (order) => {
    try {
        console.log("order", order)
        const response = await axios.post(api, order)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})

export const getwishListProduct = createAsyncThunk('wishlist/getwishListProduct', async () => {
    try {
        const response = await axios.get(api)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})
export const updateWishListDetails = createAsyncThunk('wishlist/updateWishListDetails', async (order) => {
    try {
        const id = order.id
        delete order.id
        const response = await axios.put(`${api}${id}/`, order)
        return response.data

    } catch (error) {
        console.log(error)

    }
})
export const deleteWishList = createAsyncThunk('wishlist/deleteWishList', async (id) => {
    try {
        console.log(id)
        const response = await axios.delete(`${api}${id}/`)
        return response.data

    } catch (error) {
        console.log(error)

    }
})


const wishListSlices = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        loding: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToWishList.pending, (state) => {
                state.loding = true
            })
            .addCase(addProductToWishList.fulfilled, (state, action) => {
                state.loding = false
                state.wishlist.push(action.payload)
            })
            .addCase(addProductToWishList.rejected, (state) => {
                state.loding = false


            })
            .addCase(getwishListProduct.pending, (state) => {
                state.loding = true
            })
            .addCase(getwishListProduct.fulfilled, (state, action) => {
                state.loding = false

                state.wishlist = action.payload
            })
            .addCase(getwishListProduct.rejected, (state) => {
                state.loding = false

            })
            .addCase(deleteWishList.pending, (state) => {
                state.loding = true


            })
            .addCase(deleteWishList.fulfilled, (state, action) => {
                state.loding = false
                const deleteOrder = action.payload
                console.log(deleteOrder, "dejbhdgihdgihsdojfbiahf")
                state.wishlist = state.wishlist.filter((o) => o.id !== deleteOrder.id)
            })
            .addCase(deleteWishList.rejected, (state) => {
                state.loding = false


            })
    }
})
export default wishListSlices.reducer