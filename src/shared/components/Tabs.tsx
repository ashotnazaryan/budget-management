import * as React from 'react';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { useTranslation } from 'core/i18n';
import { Option } from 'shared/models';

type TabsProps = {
  tabs: Option[];
  color?: 'primary' | 'secondary';
  defaultValue?: Option['value'];
  onChange: (event: React.SyntheticEvent, value: Option['value']) => void;
} & MuiTabsProps;

const Tabs: React.FC<TabsProps> = ({ tabs, color = 'primary', defaultValue = '0', onChange, ...props }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue);

  const onValueChange = (event: React.SyntheticEvent, selectedValue: Option['value']): void => {
    setSelectedValue(selectedValue);
    onChange(event, selectedValue);
  };

  return (
    <MuiTabs {...props} textColor={color} indicatorColor={color} value={selectedValue} onChange={onValueChange}>
      {
        tabs.map(({ value, label }) => (
          <MuiTab value={value} key={value} label={t(label)} sx={{ fontSize: { sm: 14, xs: 12 } }} />
        ))
      }
    </MuiTabs>
  );
};

export default Tabs;
