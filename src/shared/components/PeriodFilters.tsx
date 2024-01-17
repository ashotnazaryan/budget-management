import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { Period } from 'shared/models';
import Button from 'shared/components/Button';

type PeriodFiltersProps = {
  selectedPeriod: Period;
  transparentBackground?: boolean;
  onFilter: (period: Period) => void;
} & BoxProps;

interface PeriodButton {
  period: Period;
  label: string;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ selectedPeriod, transparentBackground = false, onFilter, ...props }) => {
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
    <Box
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: transparentBackground ? 'transparent' : dark,
        borderRadius: 1
      }} display='flex' justifyContent='center' flexGrow={1}>
      <ButtonGroup variant='text'>
        {periodButtons.map(({ period, label }) => (
          renderPeriodButton(period, label)
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default PeriodFilters;
