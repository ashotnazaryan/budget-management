import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from 'store';
import { ICONS_LIST, ROUTES } from 'shared/constants';
import { CategoryDTO, CategoryField, CategoryType, IconType } from 'shared/models';
import { categoryHelper } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import BackButton from 'shared/components/BackButton';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';
import { createCategory, selectCategory } from 'store/reducers';

interface NewCategoryProps { }

const icons = ICONS_LIST;

const NewCategory: React.FC<NewCategoryProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error = { message: '' } } = useAppSelector(selectCategory);
  const loading = status === 'loading';
  const helper = categoryHelper();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);

  const defaultValues: Partial<CategoryDTO> = {
    type: CategoryType.expense,
    name: '',
  };

  const methods = useForm<CategoryDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    methods.setValue(CategoryField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCategoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const type = Number(event.target.value) as CategoryType;

    methods.setValue(CategoryField.type, type, { shouldValidate: true });
  };

  const handleFormSubmit = (data: CategoryDTO): void => {
    dispatch(createCategory(data));
    setFormSubmitted(true);
  };

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.categories.path}`);
  }, [navigate]);

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    } else if (status === 'failed') {
      setShowSnackbar(true);
    }
  }, [goBack, loading, status, formSubmitted]);

  return (
    <Box display='flex' flexDirection='column' component='form' flexGrow={1} onSubmit={methods.handleSubmit(handleFormSubmit)}>
      <Box display='flex' alignItems='center' sx={{ marginBottom: 3 }}>
        <BackButton onClick={goBack} />
        <PageTitle text='Create new category' sx={{ marginBottom: 0, flexGrow: 1, textAlign: 'center' }} />
      </Box>
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
          <Typography variant='subtitle1' sx={{ marginY: 1 }}>Type</Typography>
          <Controller
            control={methods.control}
            name={CategoryField.type}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              // TODO: move to a shared components
              <RadioGroup row>
                <FormControlLabel value={field.value} label='Expense'
                  control={
                    <Radio
                      checked={field.value === 0}
                      onChange={handleCategoryTypeChange}
                      value={0}
                    />
                  }
                />
                <FormControlLabel value={field.value} label='Income'
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
          <Typography variant='subtitle1' sx={{ marginY: 1 }}>Icon</Typography>
          <Controller
            control={methods.control}
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
                <Typography color='error.main' fontSize={12} sx={{ marginTop: 2 }}>{error ? helper.icon[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 3 }}>
        <Button variant='contained' onClick={methods.handleSubmit(handleFormSubmit)} loading={loading}>Save</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default NewCategory;
