import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { IconType } from 'shared/models';
import Button from 'shared/components/Button';
import Icon from 'shared/components/Icon';

const Login: React.FC<{}> = () => {
  const { palette: { info: { main, contrastText } } } = useTheme();
  const { t } = useTranslation();

  const googleLogin = (): void => {
    window.open(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/google`, '_self');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      padding: 2
    }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: { sm: 320, xs: '100%' },
          minHeight: 200,
          padding: 4,
          backgroundColor: main
        }}>
        <Typography
          data-testid='page-title'
          color={contrastText}
          fontSize={{ sm: 24, xs: 20 }}
          sx={{ textAlign: 'center' }}
        >
          {t('LOGIN.TITLE')}
        </Typography>
        <Button
          aria-label='Google button'
          fullWidth
          data-testid='google-button'
          variant='contained'
          capitalize={false}
          onClick={googleLogin}
          sx={{
            fontSize: { sm: 17, xs: 15 },
            '& .MuiButton-startIcon>*': {
              fontSize: '32px !important'
            }
          }}
          startIcon={<Icon name={IconType.google} />}
        >
          {t('LOGIN.BUTTON_PREFIX')} Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
