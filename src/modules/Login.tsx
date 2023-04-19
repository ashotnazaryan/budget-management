import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import GoogleIcon from '@mui/icons-material/Google';
import { useTheme } from '@mui/material/styles';
import FormInput from 'shared/components/FormInput';

const Login: React.FC = () => {
  const methods = useForm();
  const { palette: { info: { main } } } = useTheme();

  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/google`, '_self');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: 2 }}>
      <FormProvider {...methods}>
        <Paper elevation={3} sx={{ maxWidth: { md: '50%', sm: '75%', xs: '100%' }, marginInline: 'auto', padding: 4 }}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} sm={6}>
              <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off'
                sx={{ paddingRight: { sm: 4 }, borderRight: { sm: `1px solid ${main}` } }}
                onSubmit={methods.handleSubmit(googleLogin)}
              >
                <Typography variant='subtitle2'
                  sx={{ textAlign: 'center', marginBottom: { sm: 2, xs: 4 }, }}
                >
                  Log into your account
                </Typography>
                <FormInput label='Email' type='email' name='email' required disabled sx={{ mb: 4 }} />
                <FormInput type='password' label='Password' name='password' required disabled sx={{ mb: 4 }} />
                <Button disabled variant='contained'>Login</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'
                sx={{
                  paddingLeft: { sm: 4 },
                  marginTop: { xs: 4, sm: 0 },
                  marginBottom: { xs: 4, sm: 2 },
                  textAlign: 'center',
                }}
              >
                Log in with another provider
              </Typography>
              <Box display='flex' flexDirection='column'
                sx={{ paddingLeft: { sm: 4 }, rowGap: 1 }}
              >
                <Button variant='outlined' startIcon={<GoogleIcon />} onClick={googleLogin}>
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
