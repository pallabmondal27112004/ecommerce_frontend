import { createSlice } from "@reduxjs/toolkit";
const authDashboardSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    singleUser: null,
    loading:false
  },
  reducers: {
    dashboardlogin: (state, action) => {
      if(action.payload!=null){

        state.isAuthenticated = true;
        state.singleUser = action.payload;
        console.log("user is loginin dashboard")
        localStorage.setItem("authuser", JSON.stringify(action.payload)); 
      }
    },
    dashboardlogout: (state) => {
      state.isAuthenticated = false;
      state.singleUser = null;
      localStorage.removeItem("authuser");
    },
  },
  
});

export const { dashboardlogin, dashboardlogout } = authDashboardSlice.actions;
export default authDashboardSlice.reducer;
