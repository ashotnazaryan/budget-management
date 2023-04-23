import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import {  Period } from 'shared/models';
import Button from 'shared/components/Button';

interface PeriodFiltersProps {
  selectedPeriod: Period;
  onFilter: (period: Period) => void;
}

const PeriodFilters: React.FC<PeriodFiltersProps> = ({ selectedPeriod, onFilter }) => {
  const { t } = useTranslation();

  return (
    <ButtonGroup variant='text'>
      <Button variant={selectedPeriod === Period.day ? 'contained' : 'text'} color='secondary' capitalize={false} sx={{ fontSize: 13, paddingX: 1 }} onClick={() => onFilter(Period.day)}>{t('COMMON.DAY')}</Button>
      <Button variant={selectedPeriod === Period.week ? 'contained' : 'text'} color='secondary' capitalize={false} sx={{ fontSize: 13, paddingX: 1 }} onClick={() => onFilter(Period.week)}>{t('COMMON.WEEK')}</Button>
      <Button variant={selectedPeriod === Period.month ? 'contained' : 'text'} color='secondary' capitalize={false} sx={{ fontSize: 13, paddingX: 1 }} onClick={() => onFilter(Period.month)}>{t('COMMON.MONTH')}</Button>
      <Button variant={selectedPeriod === Period.year ? 'contained' : 'text'} color='secondary' capitalize={false} sx={{ fontSize: 13, paddingX: 1 }} onClick={() => onFilter(Period.year)}>{t('COMMON.YEAR')}</Button>
      <Button variant={selectedPeriod === Period.allTime ? 'contained' : 'text'} color='secondary' capitalize={false} sx={{ fontSize: 13, paddingX: 1 }} onClick={() => onFilter(Period.allTime)}>{t('COMMON.ALL_TIME')}</Button>
    </ButtonGroup>
  );
};

export default PeriodFilters;
