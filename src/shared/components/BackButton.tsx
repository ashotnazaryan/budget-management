import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button, { ButtonProps } from './Button';

type BackButtonProps = ButtonProps;

const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <Button
      {...props}
      color='primary'
      onClick={props.onClick}
      startIcon={<ArrowBackIcon />}>
      {t('COMMON.BACK')}
    </Button>
  );
};

export default BackButton;
