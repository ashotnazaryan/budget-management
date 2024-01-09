import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { IconType } from 'shared/models';
import Icon from './Icon';

type DeleteButtonProps = IconButtonProps;

const DeleteButton: React.FC<DeleteButtonProps> = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      aria-label='Delete button'
      color='secondary'
      size='small'
      sx={{
        ...props.sx,
      }}
      onClick={props.onClick}>
      <Icon name={IconType.delete}></Icon>
    </IconButton>
  );
};

export default DeleteButton;
