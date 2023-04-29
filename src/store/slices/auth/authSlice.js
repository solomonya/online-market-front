import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

const authReducer = authSlice.reducer;
const isAuthSelect = (state) => Boolean(state.auth.token);

export const { setToken, logout } = authSlice.actions;

export { authReducer };
export { isAuthSelect };
