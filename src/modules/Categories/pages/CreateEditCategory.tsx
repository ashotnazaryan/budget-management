import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { createCategory, editCategory, getCategory, selectCategory, selectCurrentCategory, resetCurrentCategory, selectCategoryError, deleteCategory } from 'store/reducers';
import { CATEGORY_ICONS_LIST, CATEGORY_TABS, ROUTES } from 'shared/constants';
import { CategoryDTO, CategoryField, CategoryType, IconType } from 'shared/models';
import { categoryHelper, mapCategoryTypesWithTranslations } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

interface NewCategoryProps {
  mode: 'create' | 'edit';
}

const icons = CATEGORY_ICONS_LIST;

const CreateEditCategory: React.FC<NewCategoryProps> = ({ mode }) => {
  const categoryTabs = CATEGORY_TABS;
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { status, deleteStatus, currentStatus } = useAppSelector(selectCategory);
  const error = useAppSelector(selectCategoryError);
  const category = useAppSelector(selectCurrentCategory);
  const { palette: { info: { contrastText } } } = useTheme();
  const helper = categoryHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const categoryId = state?.id as CategoryDTO['id'];
  const categoryType = state?.categoryType as CategoryType;
  const isEditMode = mode === 'edit';

  const defaultValues: Partial<CategoryDTO> = {
    type: String(categoryType) as unknown as number,
    name: '',
  };

  const methods = useForm<CategoryDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control, watch } = methods;
  const watchType = Number(watch(CategoryField.type));

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    setValue(CategoryField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCategoryTypeChange = (value: string): void => {
    const type = Number(value) as CategoryType;

    setValue(CategoryField.type, type, { shouldValidate: true });
  };

  const handleFormSubmit = (data: CategoryDTO): void => {
    isEditMode ? dispatch(editCategory([categoryId, data])) : dispatch(createCategory(data));
    setFormSubmitted(true);
  };

  const handleDeleteCategory = (): void => {
    dispatch(deleteCategory(categoryId));
    setDeleteClicked(true);
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const setFormValues = React.useCallback(() => {
    if (category) {
      setValue(CategoryField.type, String(category.type) as unknown as number);
      setValue(CategoryField.name, category.name);
      setValue(CategoryField.icon, category.icon);
    }
  }, [category, setValue]);

  const resetForm = React.useCallback(() => {
    dispatch(resetCurrentCategory());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.categories.path}`);
    resetForm();
  }, [navigate, resetForm]);

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const getTitle = (): string => {
    return isEditMode ? t('CATEGORIES.EDIT_CATEGORY') : t('CATEGORIES.NEW_CATEGORY');
  };

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    }

    if (status === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [goBack, status, formSubmitted]);

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (categoryId && isEditMode) {
      dispatch(getCategory(categoryId));
    }
  }, [categoryId, isEditMode, dispatch]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const renderContent = (): React.ReactElement => {
    if (currentStatus === 'loading') {
      return <Skeleton />;
    }

    if (isEditMode && (!category || !categoryId)) {
      return <EmptyState text={t('CATEGORIES.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={5}>
          <Grid item xs={12}>
            <FormInput
              label={t('COMMON.NAME')}
              name={CategoryField.name}
              rules={{
                required: {
                  value: true,
                  message: t(helper.name.required!.message)
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color={contrastText} sx={{ marginY: 1 }}>{t('COMMON.TYPE')}</Typography>
            <FormRadioGroup
              name={CategoryField.type}
              rules={{
                required: {
                  value: true,
                  message: t(helper.type.required!.message)
                }
              }}
              options={mapCategoryTypesWithTranslations(categoryTabs, t)}
              labelColor={contrastText}
              value={watchType}
              onRadioChange={handleCategoryTypeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color={contrastText} sx={{ marginY: 1 }}>{t('COMMON.ICON')}</Typography>
            <Controller
              control={control}
              name={CategoryField.icon}
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Grid container {...field} columnGap={1} rowGap={3} sx={{ marginTop: 2 }}>
                    {
                      icons.map(({ name }) => (
                        <Grid item key={name}>
                          <AccountIcon selected={field.value} id={name} icon={name} size={50} onClick={handleAccountIconClick} />
                        </Grid>
                      ))
                    }
                  </Grid>
                  {error && <FormHelperText error>{t(helper.icon[error.type]!.message)}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          {isEditMode && (
            <Grid item xs={12}>
              <Button color='secondary' variant='contained'
                onClick={handleOpenDialog}>
                {t('COMMON.DELETE')}
              </Button>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1}>
        {renderContent()}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' loading={loading}
          sx={{ width: { sm: 'auto', xs: '100%' } }}
          onClick={handleSubmit(handleFormSubmit)}>
          {t('COMMON.SAVE')}
        </Button>
      </Box>
      <Snackbar type='error' text={error?.messageKey ? t(error.messageKey) : error?.message || ''} open={showSnackbar} onClose={handleSnackbarClose} />
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('CATEGORIES.DELETE_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        loading={deleteLoading}
        onClose={handleCloseDialog}
        onAction={handleDeleteCategory}
      >
        <Typography variant='subtitle1'>
          {t('CATEGORIES.DELETE_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box >
  );
};

export default CreateEditCategory;
