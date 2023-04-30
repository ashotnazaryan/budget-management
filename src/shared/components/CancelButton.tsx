import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { IconType } from 'shared/models';
import Icon from './Icon';

type CancelButtonProps = IconButtonProps;

const CancelButton: React.FC<CancelButtonProps> = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      color='secondary'
      size='small'
      sx={{
        ...props.sx,
      }}
      onClick={props.onClick}>
      <Icon name={IconType.cancel}></Icon>
    </IconButton>
  );
};

export default CancelButton;
