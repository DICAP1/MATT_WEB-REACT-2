import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      name: '',
      lastName: '',
      password: '',
      isAuthenticated: false,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = {
        ...state.user,
        ...payload
      };
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
