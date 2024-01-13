import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { editProfile, getProfile, selectProfile } from 'store/reducers';
import { ProfileField, UserProfile } from 'shared/models';
import { COUNTRIES } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import FormInput from 'shared/components/FormInput';
import FormSelect from 'shared/components/FormSelect';
import Button from 'shared/components/Button';
import Skeleton from 'shared/components/Skeleton';

const Profile: React.FC<{}> = () => {
  const countries = COUNTRIES;
  const { t } = useTranslation();
  const { status, editStatus, userProfile } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = status === 'loading';
  const editLoading = editStatus === 'loading';

  const defaultValues: Partial<UserProfile> = {
    streetAddress: '',
    streetAddressLine: '',
    city: '',
    region: '',
    zipCode: '',
    countryCode: '',
    taxId: '',
    accountNumber: ''
  };

  const methods = useForm<UserProfile>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { handleSubmit, setValue, reset, formState: { isDirty } } = methods;

  const resetForm = React.useCallback(() => {
    reset(userProfile, { keepDirty: false });
  }, [reset, userProfile]);

  const setFormValues = React.useCallback(() => {
    if (userProfile) {
      Object.keys(userProfile).forEach((key) => {
        setValue(key as keyof UserProfile, userProfile[key as keyof UserProfile], { shouldDirty: false });
      });
    }
  }, [userProfile, setValue]);

  const goBack = React.useCallback(() => {
    navigate(-1);
    resetForm();
  }, [navigate, resetForm]);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getProfile());
    }
  }, [dispatch, status]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  const handleCancelButtonClick = (): void => {
    resetForm();
  };

  const handleFormSubmit = (data: UserProfile): void => {
    dispatch(editProfile(data));
  };

  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <Skeleton type='form' />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container columnSpacing={3} rowSpacing={7} alignItems='flex-end'>
          <Grid item xs={12}>
            <FormInput
              label={t('PROFILE.STREET_ADDRESS')}
              name={ProfileField.streetAddress}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              label={t('PROFILE.STREET_ADDRESS_LINE')}
              name={ProfileField.streetAddressLine}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label={t('PROFILE.CITY')}
              name={ProfileField.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label={t('PROFILE.REGION')}
              name={ProfileField.region}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label={t('PROFILE.ZIP_CODE')}
              name={ProfileField.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormSelect
              label={t('PROFILE.COUNTRY')}
              name={ProfileField.countryCode}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '200px'
                  }
                }
              }}
            >
              {countries.map(({ name, code }) => (
                <MenuItem key={code} value={code}>{name}</MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label={t('PROFILE.VAT_ID')}
              name={ProfileField.taxId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label={t('PROFILE.ACCOUNT_NUMBER')}
              name={ProfileField.accountNumber}
            />
          </Grid>
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle
        withBackButton
        withCancelButton={isDirty}
        data-testid='page-title'
        text={t('PROFILE.PAGE_TITLE')}
        onBackButtonClick={goBack}
        onCancelButtonClick={handleCancelButtonClick}
      />
      <Box flexGrow={1}>
        {renderContent()}
      </Box>
      <Grid container display='flex' justifyContent='flex-end' rowGap={2} columnGap={2} sx={{ marginTop: 6, marginBottom: 4 }}>
        <Grid item sm='auto' xs={12}>
          <Button
            fullWidth
            aria-label='Save profile'
            type='submit'
            variant='contained'
            loading={editLoading}
            disabled={!isDirty}
            onClick={handleSubmit(handleFormSubmit)}
          >
            {t('COMMON.SAVE')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
