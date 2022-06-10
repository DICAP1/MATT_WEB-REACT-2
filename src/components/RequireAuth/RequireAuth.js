import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export const RequireAuth = ({children, redirectTo}) => {

  let isAuthenticated = useSelector(state => state.auth.user.isAuthenticated);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
