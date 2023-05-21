import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'core/i18n';

type EmptyStateProps = {
  text: string;
} & BoxProps

const EmptyState: React.FC<EmptyStateProps> = ({ text, ...props }) => {
  const { palette: { info: { contrastText } } } = useTheme();
  const { t } = useTranslation();
  const textValue = text || t('COMMON.NO_DATA');

  return (
    <Box
      display='flex'
      justifyContent='center'
      {...props}
      sx={{
        width: '100%',
        ...props.sx
      }}>
      <Typography noWrap color={contrastText} fontSize={{ sm: 18, xs: 16 }}>{textValue}</Typography>
    </Box>
  );
};

export default EmptyState;
