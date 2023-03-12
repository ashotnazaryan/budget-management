import * as React from 'react';
import { ICONS } from 'shared/constants';
import { IconType } from 'shared/models';

type IconComponentProps = { name: string };

const IconComponent: React.FC<IconComponentProps> = ({ name, ...props }) => {
  const Icon = ICONS[name] || ICONS[IconType.default];

  return <Icon fontSize='large' {...props} />;
};

export default IconComponent;
