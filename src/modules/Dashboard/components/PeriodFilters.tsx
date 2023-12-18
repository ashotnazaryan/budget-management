import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { Period } from 'shared/models';
import Button from 'shared/components/Button';

interface PeriodFiltersProps {
  selectedPeriod: Period;
  onFilter: (period: Period) => void;
}

interface PeriodButton {
  period: Period;
  label: string;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ selectedPeriod, onFilter }) => {
  const { palette: { primary: { dark } } } = useTheme();
  const { t } = useTranslation();

  const periodButtons: PeriodButton[] = [
    {
      period: Period.day,
      label: t('COMMON.DAY')
    },
    {
      period: Period.week,
      label: t('COMMON.WEEK')
    },
    {
      period: Period.month,
      label: t('COMMON.MONTH')
    },
    {
      period: Period.year,
      label: t('COMMON.YEAR')
    },
    {
      period: Period.allTime,
      label: t('COMMON.ALL_TIME')
    },
  ];

  const renderPeriodButton = (period: PeriodButton['period'], label: PeriodButton['label']): React.ReactElement => {
    return (
      <Button
        aria-label={`Period-filter-${label}`}
        key={period}
        variant={selectedPeriod === period ? 'contained' : 'text'}
        color='secondary'
        capitalize={false}
        sx={{ fontSize: { sm: 13, xs: 11 }, paddingX: 1 }}
        onClick={() => onFilter(period)}
      >
        {label}
      </Button>
    );
  };

  return (
    <Box display='flex' justifyContent='center' flexGrow={1} sx={{ backgroundColor: dark, borderRadius: 1 }}>
      <ButtonGroup variant='text'>
        {periodButtons.map(({ period, label }) => (
          renderPeriodButton(period, label)
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default PeriodFilters;
