import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, setUser } from '../../slices/authSlice';
import { useEffect } from 'react';
import { useLazyGetUserByIdQuery } from '../../api/users';
import { useLazyGetSubscriptionQuery } from '../../api/stripe'

export const RequireAuth = ({
  redirectTo = '/login',
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [getUser, user] = useLazyGetUserByIdQuery();
  const [getUserSubscription] = useLazyGetSubscriptionQuery()

  useEffect(() => {

    const initLocalStorage = async () => {
      try {
        const credentials = localStorage.getItem('credentials')
      
        if (!credentials) {
          dispatch(setUser({
            isAuth: false,
          }));
        } else {
          const {
            public_id,
          } = JSON.parse(credentials);
          await getUser({publicId: public_id}).unwrap();
        }
      }catch (e) {
        dispatch(setUser({
          isAuth: false,
        }));
        localStorage.removeItem('credentials')
      }     
    }

    initLocalStorage();
  }, []);

  useEffect(() => {
    const initUser = async () => {
      try {
        const userSubscription = await getUserSubscription({ publicId: user?.data?.public_id})
          const isActive = userSubscription?.data?.data.some(
            (subscription) => subscription.plan.active
        )
        if (user?.data?.confirmed) {
          dispatch(setUser({
            isAuth: true,
            ...user?.data 
          }));

          if (user?.data?.has_onboard) {
            window.location.replace('https://demotraider.divergencecapital.com/#/get-started')
            return
          }

          if (isActive) {
            navigate('./select-broker')
            return
          }
  
          navigate('./pricing')
        }
      } catch (err) {
        console.log('error getting user', err.message);
        dispatch(setUser({
          isAuth: false,
        }));
      }
    }

    initUser();
  }, [user])

  if (isAuth === null) {
    return null
  }

  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />
}
