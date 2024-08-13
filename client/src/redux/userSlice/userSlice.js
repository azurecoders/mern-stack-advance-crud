import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accountStart: (state) => {
      state.loading = true;
    },
    accountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    accountSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    accountLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
  },
});

export const { accountStart, accountFailure, accountSuccess, accountLogout } =
  userSlice.actions;
export default userSlice.reducer;
