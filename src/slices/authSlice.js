import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      name: '',
      lastName: '',
      password: '',
      isAuth: null,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = {
        ...state.user,
        ...payload,
      }
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer

export const selectUserCredentials = (state) => {
  return {
    publicId: state.auth.user.public_id,
  };
};
export const selectIsAuth = state => state.auth.user.isAuth;
