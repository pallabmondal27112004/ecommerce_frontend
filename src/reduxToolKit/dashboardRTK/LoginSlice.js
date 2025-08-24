import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api/user/";
export const getUsersFromDashboard = createAsyncThunk("users/getuser", async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; 
    }
});

const userSliceDashboard = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =============getuserFromdashboard=================

            .addCase(getUsersFromDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersFromDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); 
            })
            .addCase(getUsersFromDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default userSliceDashboard.reducer;
