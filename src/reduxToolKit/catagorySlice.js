import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const url = "https://ecommerce-backend-mrre.onrender.com/api/catagory/"
export const getCategory = createAsyncThunk("category/getCategory", async () => {
    try {
        const response = await axios.get(url)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})



const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        loding: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.loding = true
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loding = false
                state.category = action.payload
            })
            .addCase(getCategory.rejected, (state) => {
                state.loding = false
            });

    }
})


export default categorySlice.reducer