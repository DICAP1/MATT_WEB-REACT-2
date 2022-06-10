import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      name: '',
      lastName: '',
      password: ''
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
  }
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;
