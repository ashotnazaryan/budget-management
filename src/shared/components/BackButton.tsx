import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { IconType } from 'shared/models';
import Icon from './Icon';

type BackButtonProps = IconButtonProps;

const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      color='primary'
      size='small'
      sx={{
        ...props.sx,
      }}
      onClick={props.onClick}>
      <Icon name={IconType.west}></Icon>
    </IconButton>
  );
};

export default BackButton;
