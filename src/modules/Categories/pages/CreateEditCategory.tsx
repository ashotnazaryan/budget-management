import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { createCategory, editCategory, getCategory, selectCategory, selectCurrentCategory, resetCurrentCategory } from 'store/reducers';
import { ICONS_LIST, ROUTES } from 'shared/constants';
import { CategoryDTO, CategoryField, CategoryType, IconType } from 'shared/models';
import { categoryHelper } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';

interface NewCategoryProps {
  mode: 'create' | 'edit';
}

const icons = ICONS_LIST;

const CreateEditCategory: React.FC<NewCategoryProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { status, error = { message: '' } } = useAppSelector(selectCategory);
  const category = useAppSelector(selectCurrentCategory);
  const { palette: { info: { contrastText } } } = useTheme();
  const loading = status === 'loading';
  const helper = categoryHelper();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const categoryId = state?.id || null;

  const defaultValues: Partial<CategoryDTO> = {
    type: CategoryType.expense,
    name: '',
  };

  const methods = useForm<CategoryDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control } = methods;

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    setValue(CategoryField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCategoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const type = Number(event.target.value) as CategoryType;

    setValue(CategoryField.type, type, { shouldValidate: true });
  };

  const handleFormSubmit = (data: CategoryDTO): void => {
    mode === 'create' ? dispatch(createCategory(data)) : dispatch(editCategory([categoryId, data]));
    setFormSubmitted(true);
  };

  const setFormValues = React.useCallback(() => {
    if (category) {
      setValue(CategoryField.type, category.type);
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
    return mode === 'create' ? 'Create new category' : 'Edit category';
  };

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    } else if (status === 'failed') {
      setShowSnackbar(true);
    }
  }, [goBack, loading, status, formSubmitted]);

  React.useEffect(() => {
    if (categoryId && mode === 'edit') {
      dispatch(getCategory(categoryId));
    }
  }, [categoryId, mode, dispatch]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  return (
    <Box display='flex' flexDirection='column' component='form' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1} display='flex' flexDirection='column'>
        <FormProvider {...methods}>
          <FormInput
            focused
            label='Name'
            name={CategoryField.name}
            rules={{
              required: {
                value: true,
                message: helper.name.required?.message
              },
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>Type</Typography>
          <Controller
            control={control}
            name={CategoryField.type}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              // TODO: move to a shared components
              <RadioGroup row>
                <FormControlLabel value={field.value}
                  label={
                    <Typography color={contrastText}>Expense</Typography>
                  }
                  control={
                    <Radio
                      checked={field.value === 0}
                      onChange={handleCategoryTypeChange}
                      value={0}
                    />
                  }
                />
                <FormControlLabel value={field.value}
                  label={
                    <Typography color={contrastText}>Income</Typography>
                  }
                  control={
                    <Radio
                      checked={field.value === 1}
                      onChange={handleCategoryTypeChange}
                      value={1}
                    />
                  }
                />
              </RadioGroup>
            )}
          />
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>Icon</Typography>
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
                {error && <FormHelperText error>{helper.icon[error.type]?.message}</FormHelperText>}
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' onClick={handleSubmit(handleFormSubmit)} loading={loading}>Save</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default CreateEditCategory;
