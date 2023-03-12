import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { theme } from 'core/theme.config';
import { ROUTES, AUTH_KEY } from 'shared/constants';
import { saveToLocalStorage } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        saveToLocalStorage(AUTH_KEY, { token: codeResponse.access_token });
        navigate(ROUTES.dashboard.path);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: 2 }}>
      <FormProvider {...methods}>
        <Paper elevation={3} sx={{ maxWidth: { md: '50%', sm: '75%', xs: '100%' }, marginInline: 'auto', padding: 4 }}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} sm={6}>
              <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off'
                sx={{ paddingRight: { sm: 4 }, borderRight: { sm: `1px solid ${theme.palette.info.main}` } }}
                onSubmit={methods.handleSubmit(googleLogin)}
              >
                <Typography variant='subtitle2'
                  sx={{ textAlign: 'center', marginBottom: { sm: 2, xs: 4 }, }}
                >
                  Log into your account
                </Typography>
                <FormInput label='Email' type='email' name='email' focused required sx={{ mb: 4 }} />
                <FormInput type='password' label='Password' name='password' required focused sx={{ mb: 4 }} />
                <Button variant='contained'>Login</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'
                sx={{
                  paddingLeft: { sm: 4 },
                  marginTop: { xs: 4, sm: 0 },
                  marginBottom: { sm: 2, xs: 4 },
                  textAlign: 'center',
                }}
              >
                Log in with another provider
              </Typography>
              <Box display='flex' flexDirection='column'
                sx={{ paddingLeft: { sm: 4 }, rowGap: 1 }}
              >
                <Button color='secondary' variant='contained' onClick={() => googleLogin()}>
                  Google
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </FormProvider>
    </Box>
  );
};

export default Login;
