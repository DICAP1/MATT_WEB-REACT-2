import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, setUser } from '../../slices/authSlice';
import { useEffect } from 'react';
import { useLazyGetUserByIdQuery } from '../../api/users';

export const RequireAuth = ({
  redirectTo,
}) => {
  const dispatch = useDispatch(); 
  const isAuth = useSelector(selectIsAuth);
  const [getUser, user] = useLazyGetUserByIdQuery();

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')
    
    if (!credentials) {
      dispatch(setUser({
        isAuth: false,
      }));
    } else {
      const {
        public_id,
        token
      } = JSON.parse(credentials);
      getUser({publicId: public_id, authToken: token});
    }
  }, []);

  useEffect(() => {
    try {
      if (user?.data?.confirmed) {
        dispatch(setUser({
          isAuth: true,
        }));
      }
    } catch (err) {
      console.log('error getting user', err.message);
      dispatch(setUser({
        isAuth: false,
      }));
    }
  }, [user])

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet/> : <Navigate to={redirectTo}/>;
};

