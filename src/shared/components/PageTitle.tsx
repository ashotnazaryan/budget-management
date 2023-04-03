import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BackButton from './BackButton';

type PageTitleProps = {
  text: string;
  withBackButton?: boolean;
  onBackButtonClick?: () => void;
} & TypographyProps;

const PageTitle: React.FC<PageTitleProps> = ({ text, withBackButton = false, onBackButtonClick, ...props }) => {
  const onClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  };

  return (
    <Box display='flex' alignItems='center' sx={{ marginBottom: 5 }}>
      {withBackButton && <BackButton onClick={onClick} />}
      <Typography variant='h5' sx={{ textAlign: 'center', width: '100%' }} {...props}>{text}</Typography>
    </Box>
  );
};

export default PageTitle;
