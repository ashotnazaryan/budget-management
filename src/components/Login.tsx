import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import { ROUTES } from 'shared/constants';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        });
        console.log('User: ', response.data);
      }
      catch(error) {
        console.log(error);
      }

      navigate(ROUTES.home.path);
    },
    onError: (error) => {
      console.log('Login Failed: ', error);
    }
  });

  return (
    <Button variant='outlined' onClick={() => googleLogin()}>Google Login</Button>
  );
};

export default Login;
