import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  closeSidebar,
  selectUser,
  logout,
  selectApp,
  selectSummary,
  getBalance
} from 'store/reducers';
import Dialog from 'shared/components/Dialog';
import UserBalanceInfo from 'modules/components/UserBalanceInfo';
import SideBarSettingsPreview from './components/SideBarSettingsPreview';
import Menu from './components/Menu';
import { ROUTES } from 'shared/constants';

interface SideBarProps extends MuiDrawerProps { }

const SideBar: React.FC<SideBarProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { sideBarOpened } = useAppSelector(selectApp);
  const user = useAppSelector(selectUser);
  const { balance, balanceStatus } = useAppSelector(selectSummary);
  const { palette: { secondary: { main } } } = useTheme();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const avatar = user.avatar;

  const close = (): void => {
    dispatch(closeSidebar());
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleLogout = (): void => {
    setDialogOpened(false);
    dispatch(logout());
  };

  const handleAvatarClick = (): void => {
    close();
    navigate(ROUTES.profile.path);
  };

  React.useEffect(() => {
    if (balanceStatus === 'idle') {
      dispatch(getBalance());
    }
  }, [dispatch, balanceStatus]);

  return (
    <>
      <Grid container justifyContent='flex-start' alignItems='center'>
        <Grid item>
          <Drawer
            {...props}
            variant={props.variant}
            PaperProps={{ sx: { width: { xs: '100%', sm: '320px' } } }}
            open={sideBarOpened}
            onClose={close}
          >
            <Grid item container alignItems='center' sx={{ paddingY: 2, paddingX: 4, borderBottom: `1px solid ${main}` }} columnSpacing={2}>
              <Grid item xs={11}>
                <UserBalanceInfo fullName={user.fullName} avatar={avatar} balance={balance} onAvatarClick={handleAvatarClick} />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label='Close sidebar' edge='start' color='secondary' onClick={close}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
            </Grid>
            <SideBarSettingsPreview />
            <Menu onOpenDialog={handleOpenDialog} onCloseSideBar={close} />
          </Drawer>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('SIDEBAR.LOGOUT_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={handleLogout}>
        <Typography variant='subtitle1'>
          {t('SIDEBAR.LOGOUT_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </>
  );
};

export default SideBar;