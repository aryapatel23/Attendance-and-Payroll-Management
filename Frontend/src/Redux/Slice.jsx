import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
