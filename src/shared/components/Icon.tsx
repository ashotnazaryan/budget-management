import * as React from 'react';
import { IconProps } from '@mui/material/Icon';
import { ICONS } from 'shared/constants';
import { IconType } from 'shared/models';

type IconComponentProps = {
  name: string;
} & Partial<IconProps<any>>;

const IconComponent: React.FC<IconComponentProps> = ({ name, ...props }) => {
  const Icon = ICONS[name] || ICONS[IconType.default];

  return <Icon fontSize='large' {...props}></Icon>;
};

export default IconComponent;
