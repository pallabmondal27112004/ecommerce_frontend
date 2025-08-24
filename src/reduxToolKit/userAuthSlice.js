import { createSlice } from "@reduxjs/toolkit";




// Check for existing user in localStorage
const getInitialAuthState = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return {
        isAuthenticated: true,
        singleUser: user,
        loading: false
      };
    } catch (error) {
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
        singleUser: null,
        loading: false
      };
    }
  }
  return {
    isAuthenticated: false,
    singleUser: null,
    loading: false
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      if (action.payload != null) {

        state.isAuthenticated = true;
        state.singleUser = action.payload;
        console.log("user is logjognidjfgidfujgi")
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.singleUser = null;
      localStorage.removeItem("user");
    },
  },

});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
