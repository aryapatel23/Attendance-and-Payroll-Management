import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,  // Get user from localStorage
  token: localStorage.getItem("token") || null,           // Get token from localStorage
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save token & user to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove token & user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    
    

  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;