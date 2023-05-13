import * as React from 'react';
import { IconProps } from '@mui/material/Icon';
import { ALL_ICONS } from 'shared/constants';
import { IconType } from 'shared/models';

type IconComponentProps = {
  name: string;
} & Partial<IconProps<any>>;

const IconComponent: React.FC<IconComponentProps> = ({ name = IconType.default, fontSize = 'large', ...props }) => {
  const Icon = ALL_ICONS[name];

  return <Icon {...props} fontSize={fontSize} sx={{ ...props.sx }}></Icon>;
};

export default IconComponent;
