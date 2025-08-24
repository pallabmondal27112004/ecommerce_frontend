import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice"; // Import your userSlice
import userSlice from './userSlice'
import authSlice from './userAuthSlice'
import categorySlice from './catagorySlice'
import productSlice from "./productSlice"
import orderItemSlice from "./orderItem";
import wishListSlices from './wishListSlice'
import userSliceDashboard from './dashboardRTK/LoginSlice'
import authDashboardSlice from './dashboardRTK/DashboardAuth'
import reviewSlice from './reviewSlice'
const store = configureStore({
    reducer: {
        user: userSlice, // Add reducers here
        auth : authSlice,
        category: categorySlice,
        products:productSlice,
        order:orderItemSlice,
        wishlist:wishListSlices,
        review:reviewSlice,
        // ==============dashboard===============s
        dashboardUser:userSliceDashboard,
        dashboardauth:authDashboardSlice,
    },
});

export default store;
