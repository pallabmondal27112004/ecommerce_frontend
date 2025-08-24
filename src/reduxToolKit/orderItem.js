import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addProduct = createAsyncThunk('order/addOrder', async (order) => {
    const api = 'https://ecommerce-backend-mrre.onrender.com/api/orderitem/'
    try {
        console.log("order", order)
        const response = await axios.post(api, order)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})

export const getOrderProduct = createAsyncThunk('order/getOrderProduct', async () => {
    const api = 'https://ecommerce-backend-mrre.onrender.com/api/orderitem/'
    try {
        const response = await axios.get(api)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})
export const updateOrderDetails = createAsyncThunk('order/updateOrderDetails', async (order) => {
    const api = 'https://ecommerce-backend-mrre.onrender.com/api/orderitem/'
    try {
        const id = order.id
        // delete order.id
        console.log(order, "divhbyidfb")
        const response = await axios.patch(`${api}${id}/`, order)
        return response.data

    } catch (error) {
        console.log(error)

    }
})
export const deleteOrderFromCard = createAsyncThunk('order/deleteOrderFromCard', async (id) => {
    const api = 'https://ecommerce-backend-mrre.onrender.com/api/orderitem/'
    try {
        console.log(id)
        const response = await axios.delete(`${api}${id}/`)
        return response.data

    } catch (error) {
        console.log(error)

    }
})


const orderItemSlice = createSlice({
    name: 'order',
    initialState: {
        order: [],
        loding: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loding = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loding = false
                state.order.push(action.payload)
            })
            .addCase(addProduct.rejected, (state) => {
                state.loding = false


            })
            .addCase(getOrderProduct.pending, (state) => {
                state.loding = true
            })
            .addCase(getOrderProduct.fulfilled, (state, action) => {
                state.loding = false

                state.order = action.payload
            })
            .addCase(getOrderProduct.rejected, (state, action) => {
                state.loding = false

            })
            .addCase(deleteOrderFromCard.pending, (state) => {
                state.loding = true


            })
            .addCase(deleteOrderFromCard.fulfilled, (state, action) => {
                state.loding = false
                const deleteOrder = action.payload
                console.log(deleteOrder, "dejbhdgihdgihsdojfbiahf")
                state.order = state.order.filter((o) => o.id !== deleteOrder.id)
            })
            .addCase(deleteOrderFromCard.rejected, (state) => {
                state.loding = false


            })
    }
})
export default orderItemSlice.reducer