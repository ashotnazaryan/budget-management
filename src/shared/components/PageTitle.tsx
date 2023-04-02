import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

type PageTitleProps = { text: string; } & TypographyProps;

// TODO: refactor this component to receive any children (e.g. back button)
const PageTitle: React.FC<PageTitleProps> = ({ text, ...props }) => {
  return (
    <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 3 }} {...props}>{text}</Typography>
  );
};

export default PageTitle;
