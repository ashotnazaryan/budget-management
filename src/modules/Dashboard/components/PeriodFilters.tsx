import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
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
        key={period}
        variant={selectedPeriod === period ? 'contained' : 'text'}
        color='secondary'
        capitalize={false}
        sx={{ fontSize: 13, paddingX: 1 }}
        onClick={() => onFilter(period)}
      >
        {label}
      </Button>
    );
  };

  return (
    <ButtonGroup variant='text'>
      {periodButtons.map(({ period, label }) => (
        renderPeriodButton(period, label)
      ))}
    </ButtonGroup>
  );
};

export default PeriodFilters;
