import * as React from 'react';
import { IconProps } from '@mui/material/Icon';
import { ALL_ICONS } from 'shared/constants';
import { IconType } from 'shared/models';

type IconComponentProps = {
  name: string;
} & Partial<IconProps<any>>;

const IconComponent: React.FC<IconComponentProps> = ({ name, ...props }) => {
  const Icon = ALL_ICONS[name] || ALL_ICONS[IconType.default];

  return <Icon fontSize='large' {...props}></Icon>;
};

export default IconComponent;
