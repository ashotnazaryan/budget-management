import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Ellipsis from './Ellipsis';

interface EmptyStateProps {
  text?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text = 'No data available' }) => {
  const { palette: { info: { contrastText } } } = useTheme();

  return (
    <Box display='flex' justifyContent='center'>
      <Ellipsis color={contrastText} text={text} sx={{ fontSize: { sm: 18, xs: 16 } }} />
    </Box>
  );
};

export default EmptyState;
