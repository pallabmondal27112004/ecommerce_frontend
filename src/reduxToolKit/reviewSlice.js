import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = 'https://ecommerce-backend-mrre.onrender.com/api/review/'
export const addReview = createAsyncThunk('review/addReview', async (order) => {
    try {
        console.log("order", order)
        const response = await axios.post(api, order)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})

export const getReview = createAsyncThunk('review/getReview', async () => {
    try {
        const response = await axios.get(api)
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)

    }
})
export const updateReview = createAsyncThunk('review/updateReview', async (order) => {
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
export const deleteReview = createAsyncThunk('review/deleteReview', async (id) => {
    try {
        console.log(id)
        const response = await axios.delete(`${api}${id}/`)
        return response.data

    } catch (error) {
        console.log(error)

    }
})


const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        review: [],
        loding: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReview.pending, (state) => {
                state.loding = true
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loding = false
                state.review.push(action.payload)
            })
            .addCase(addReview.rejected, (state) => {
                state.loding = false


            })
            .addCase(getReview.pending, (state) => {
                state.loding = true
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.loding = false

                state.review = action.payload
            })
            .addCase(getReview.rejected, (state) => {
                state.loding = false

            })
            .addCase(deleteReview.pending, (state) => {
                state.loding = true


            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loding = false
                const deleteOrder = action.payload
                console.log(deleteOrder, "dejbhdgihdgihsdojfbiahf")
                state.review = state.review.filter((o) => o.id !== deleteOrder.id)
            })
            .addCase(deleteReview.rejected, (state) => {
                state.loding = false


            })
    }
})
export default reviewSlice.reducer