import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import BackButton from './BackButton';

type PageTitleProps = {
  text: string;
  withBackButton?: boolean;
  onBackButtonClick?: () => void;
} & TypographyProps;

const PageTitle: React.FC<PageTitleProps> = ({ text, withBackButton = false, onBackButtonClick, ...props }) => {
  const { palette: { info: { contrastText } } } = useTheme();

  const onClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  };

  return (
    <Box display='flex' alignItems='center' sx={{ marginBottom: 5 }}>
      {withBackButton && <BackButton onClick={onClick} />}
      <Typography variant='h5' color={contrastText} sx={{ textAlign: 'center', width: '100%', fontSize: { xs: 18, sm: 24 } }} {...props}>{text}</Typography>
    </Box>
  );
};

export default PageTitle;
