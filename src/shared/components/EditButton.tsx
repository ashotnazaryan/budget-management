import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { IconType } from 'shared/models';
import Icon from './Icon';

type EditButtonProps = IconButtonProps;

const EditButton: React.FC<EditButtonProps> = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      aria-label='Edit button'
      color='primary'
      size='small'
      sx={{
        ...props.sx,
      }}
      onClick={props.onClick}>
      <Icon name={IconType.edit}></Icon>
    </IconButton>
  );
};

export default EditButton;
