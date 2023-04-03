import * as React from 'react';
import Box from '@mui/material/Box';
import Ellipsis from './Ellipsis';

interface EmptyStateProps {
  text?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text = 'No data available' }) => {
  return (
    <Box display='flex' justifyContent='center'>
      <Ellipsis fontSize={20} text={text} />
    </Box>
  );
};

export default EmptyState;
