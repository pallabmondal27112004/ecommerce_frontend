import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ecommerce-backend-mrre.onrender.com/api/user/";
export const getUsers = createAsyncThunk("users/getuser", async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});
export const createUser = createAsyncThunk("users/createUser", async (formdata) => {
    try {
        console.log("Creating user...");
        console.log(formdata, "thidfkfjgbdg")
        const response = await axios.post(url, formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});

export const updateUser = createAsyncThunk("users/updateUser", async (id) => {
    try {
        console.log("Creating user...");
        const response = await axios.put(`${url}+${id}`, {
            first_name: "Pallab",
            last_name: "Mondal",
            username: `pallab${Date.now()}`, // Unique username
            password: "123456",
            email: "pallab@example.com",
            phone_number: "1234567890",
            address: "Test Address",
            city: "Test City",
            state: "Test State",
            country: "Test Country",
            zipcode: "123456",
            date_of_birth: "2000-01-01" // Ensure correct format
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    try {
        const response = await axios.delete(`${url}+${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =====================create user=================
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // =============getuser=================
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                console.log("before payload", state.users)

                state.users = action.payload
                console.log("After payload", state.users)
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // =================update user=================
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((e) => e.id !== action.payload.id)

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default userSlice.reducer;
