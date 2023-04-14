import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonProps = ButtonProps;

const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <Button color='primary' onClick={props.onClick} {...props} startIcon={<ArrowBackIcon />}>
      {t('COMMON.BACK')}
    </Button>
  );
};

export default BackButton;
