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
    <Box display='flex' alignItems='center' sx={{ marginTop: 2, marginBottom: 5, position: 'relative' }}>
      {withBackButton && <BackButton onClick={onClick} sx={{ position: 'absolute', left: 0, fontSize: { sm: 15, xs: 12 } }} />}
      <Typography
        color={contrastText}
        sx={{
          textAlign: 'center',
          width: '100%',
          fontSize: { sm: withBackButton ? 18 : 22, xs: withBackButton ? 15 : 18 }
        }}
        {...props}>
        {text}
      </Typography>
    </Box>
  );
};

export default PageTitle;
