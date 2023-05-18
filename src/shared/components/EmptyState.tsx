import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  text: string | null;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text = 'No data is available' }) => {
  const { palette: { info: { contrastText } } } = useTheme();

  return (
    <Box display='flex' justifyContent='center'>
      <Typography noWrap color={contrastText} fontSize={{ sm: 18, xs: 16 }}>{text}</Typography>
    </Box>
  );
};

export default EmptyState;
