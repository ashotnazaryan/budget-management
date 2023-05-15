import * as React from 'react';
import { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { useTranslation } from 'core/i18n';
import { Option } from 'shared/models';
import { StyledTabs } from './Tabs.styles';

type TabsProps = {
  tabs: Option[];
  defaultValue?: Option['value'];
  onChange: (event: React.SyntheticEvent, value: Option['value']) => void;
} & MuiTabsProps;

const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue = '0', onChange, ...props }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue);

  const onValueChange = (event: React.SyntheticEvent, selectedValue: Option['value']): void => {
    setSelectedValue(selectedValue);
    onChange(event, selectedValue);
  };

  return (
    <StyledTabs {...props} value={selectedValue} onChange={onValueChange}>
      {
        tabs.map(({ value, label }) => (
          <MuiTab value={value} key={value} label={t(label)} />
        ))
      }
    </StyledTabs>
  );
};

export default Tabs;
