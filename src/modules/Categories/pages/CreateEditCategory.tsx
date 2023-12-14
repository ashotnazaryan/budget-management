import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  createCategory,
  editCategory,
  getCategory,
  selectCategory,
  selectCurrentCategory,
  resetGetCategoryStatus,
  selectCategoryError,
  deleteCategory,
  setGetCategoryErrorStatus
} from 'store/reducers';
import { CATEGORY_ICONS_LIST, TABS, ROUTES } from 'shared/constants';
import { Category, CategoryDTO, CategoryField, CategoryType, IconType, ManageMode } from 'shared/models';
import { categoryHelper, getPageTitle, mapCategoryTypesWithTranslations } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import ItemIcon from 'shared/components/ItemIcon';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import FormIcon from 'shared/components/FormIcon';

interface NewCategoryProps {
  mode: ManageMode;
}

const CreateEditCategory: React.FC<NewCategoryProps> = ({ mode }) => {
  const tabs = TABS;
  const icons = CATEGORY_ICONS_LIST;
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { getStatus, createEditStatus, deleteStatus } = useAppSelector(selectCategory);
  const error = useAppSelector(selectCategoryError);
  const category = useAppSelector(selectCurrentCategory);
  const { palette: { info: { contrastText } } } = useTheme();
  const helper = categoryHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = createEditStatus === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const categoryId = state?.id as CategoryDTO['id'];
  const categoryName = category?.nameKey ? t(category.nameKey) : (category?.name || '');
  const categoryType = state?.categoryType as CategoryType;
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;
  const title = getPageTitle<Category>(mode, t, getStatus, 'CATEGORIES', 'NEW_CATEGORY', 'EMPTY_TITLE', category);

  const defaultValues: Partial<Category> = {
    type: String(categoryType) as unknown as number,
    name: '',
  };

  const methods = useForm<Category>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, watch, reset } = methods;
  const watchType = Number(watch(CategoryField.type));

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    if (isViewMode) {
      return;
    }

    setValue(CategoryField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCategoryTypeChange = (value: string): void => {
    const type = Number(value) as CategoryType;

    setValue(CategoryField.type, type, { shouldValidate: true });
  };

  const handleFormSubmit = (data: Category): void => {
    isEditMode ? dispatch(editCategory([categoryId, data])) : dispatch(createCategory(data));
    setFormSubmitted(true);
  };

  const handleCancelButtonClick = (): void => {
    isCreateMode ? reset(defaultValues) : setFormValues();

    isEditMode
      ? navigate(`${ROUTES.categories.path}/view/${categoryName}`, { state: { id: categoryId } })
      : navigate(ROUTES.categories.path);
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

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
    setDeleteClicked(false);
  };

  const handleEditButtonClick = (): void => {
    if (isEditMode) {
      return;
    }

    navigate(`${ROUTES.categories.path}/edit/${categoryName}`, { state: { id: categoryId } });
  };

  const setFormValues = React.useCallback(() => {
    if (category) {
      setValue(CategoryField.type, String(category.type) as unknown as number);
      setValue(CategoryField.name, category.nameKey ? t(category.nameKey) : category.name);
      setValue(CategoryField.icon, category.icon);
    }
  }, [category, setValue, t]);

  const resetCategory = React.useCallback(() => {
    dispatch(resetGetCategoryStatus());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.categories.path}`);
    resetCategory();
  }, [navigate, resetCategory]);

  React.useEffect(() => {
    if (createEditStatus === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    }

    if (createEditStatus === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [goBack, createEditStatus, formSubmitted]);

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }

    if (deleteStatus === 'failed' && deleteClicked) {
      setShowSnackbar(true);
      setDialogOpened(false);
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (!categoryId) {
      dispatch(setGetCategoryErrorStatus());
    }
  }, [categoryId, dispatch]);

  React.useEffect(() => {
    if (categoryId && getStatus === 'idle' && (isEditMode || isViewMode) && !deleteClicked) {
      dispatch(getCategory(categoryId));
    }
  }, [categoryId, isEditMode, isViewMode, getStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetCategory();
    };
  }, [resetCategory]);

  const renderContent = (): React.ReactElement => {
    if (getStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!category || !categoryId) && getStatus === 'failed') {
      return <EmptyState text={t('CATEGORIES.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={5}>
          <Grid item xs={12}>
            <FormInput
              InputProps={{ readOnly: isViewMode }}
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
              readonly={isViewMode}
              name={CategoryField.type}
              rules={{
                required: {
                  value: true,
                  message: t(helper.type.required!.message)
                }
              }}
              options={mapCategoryTypesWithTranslations(tabs, t)}
              labelColor={contrastText}
              value={watchType}
              onRadioChange={handleCategoryTypeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormIcon
              name={CategoryField.icon}
              label={t('COMMON.ICON')}
              rules={{
                required: {
                  value: true,
                  message: t(helper.icon.required!.message)
                }
              }}
              render={({ field }) => (
                <Grid container {...field} columnGap={1} rowGap={3} sx={{ marginTop: 2 }}>
                  {
                    icons.map(({ name }) => (
                      <Grid item key={name}>
                        <ItemIcon selected={field.value} id={name} icon={name} size={50} readonly={isViewMode} onClick={handleAccountIconClick} />
                      </Grid>
                    ))
                  }
                </Grid>
              )} />
          </Grid>
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle
        withBackButton
        withEditButton={isViewMode && !!category}
        withDeleteButton={isEditMode && !!category}
        withCancelButton={!isViewMode && !!category}
        text={title}
        onBackButtonClick={goBack}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleOpenDialog}
        onCancelButtonClick={handleCancelButtonClick}
      />
      <Box flexGrow={1}>
        {renderContent()}
      </Box>
      {!isViewMode && (
        <Grid container display='flex' justifyContent='flex-end' rowGap={2} columnGap={2} sx={{ marginTop: 4 }}>
          <Grid item sm='auto' xs={12}>
            <Button aria-label='Save category' fullWidth type='submit' variant='contained' loading={loading}
              onClick={handleSubmit(handleFormSubmit)}>
              {t('COMMON.SAVE')}
            </Button>
          </Grid>
        </Grid>
      )}
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
    </Box>
  );
};

export default CreateEditCategory;
