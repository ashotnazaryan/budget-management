import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonProps = ButtonProps;

const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  return (
    <Button color='primary' onClick={props.onClick} startIcon={<ArrowBackIcon />}>
      Back
    </Button>
  );
};

export default BackButton;
