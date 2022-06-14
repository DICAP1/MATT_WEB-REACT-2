import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {confirmEmail} from '../../utils/auth';
import {RequireAuth} from '../RequireAuth/RequireAuth';
import Main from '../Main/Main';

const CheckHash = () => {
  const navigate = useNavigate();
  const hash = useLocation().hash;

  if (hash.includes('#/account/confirm/')) {
    const token = hash.substring(hash.lastIndexOf('/') + 1);
    console.log(token);
    confirmEmail(token)
      .then(data => {
        if (data) {
          console.log(data);
          navigate('../login');
        }
      })
      .catch(err => console.log(err)); // todo add logic
  }
  return (
    <RequireAuth redirectTo="/login">
      <Main/>
    </RequireAuth>
  );
};

export default CheckHash;
