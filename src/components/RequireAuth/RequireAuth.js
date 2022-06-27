import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, setUser } from '../../slices/authSlice';
import { useEffect } from 'react';
import { getUserById } from '../../api/users';

export const RequireAuth = ({
  redirectTo,
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    (async () => {
      const credentials = localStorage.getItem('credentials');

      if (!credentials) {
        dispatch(setUser({
          isAuth: false,
        }));
      } else {
        const {
          public_id,
          token
        } = JSON.parse(credentials);
        try {
          const user = await getUserById(public_id, token);
          if (user.confirmed) {
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
      }
    })();
  }, []);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet/> : <Navigate to={redirectTo}/>;
};

