import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { StyledTabs } from './Tabs.styles';

export interface Tab {
  value: number;
  label: string;
}

type TabsProps = {
  tabs: Tab[];
  defaultValue?: number;
  onChange: (event: React.SyntheticEvent, value: number) => void;
} & MuiTabsProps;

const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue = 0, onChange, ...props }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<number>(defaultValue);

  const onValueChange = (event: React.SyntheticEvent, selectedValue: number) => {
    setValue(selectedValue);
    onChange(event, selectedValue);
  };

  return (
    <StyledTabs {...props} value={value} onChange={onValueChange} >
      {
        tabs.map(({ value, label }) => (
          <MuiTab key={value} label={t(label)} />
        ))
      }
    </StyledTabs>
  );
};

export default Tabs;
