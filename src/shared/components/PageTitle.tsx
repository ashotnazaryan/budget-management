import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import BackButton from './BackButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

type PageTitleProps = {
  text: string;
  withBackButton?: boolean;
  withEditButton?: boolean;
  withDeleteButton?: boolean;
  onBackButtonClick?: () => void;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
} & TypographyProps;

const PageTitle: React.FC<PageTitleProps> = ({
  text,
  withBackButton = false,
  withEditButton = false,
  withDeleteButton = false,
  onBackButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  ...props
}) => {
  const { palette: { info: { contrastText } } } = useTheme();

  const onBackClick = (): void => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  };

  const onEditClick = (): void => {
    if (onEditButtonClick) {
      onEditButtonClick();
    }
  };

  const onDeleteClick = (): void => {
    if (onDeleteButtonClick) {
      onDeleteButtonClick();
    }
  };

  return (
    <Box display='flex' alignItems='center' sx={{ marginTop: 2, marginBottom: 5 }}>
      {withBackButton && <BackButton onClick={onBackClick} />}
      <Typography
        color={contrastText}
        sx={{
          textAlign: 'center',
          width: '100%',
          fontSize: 20,
          fontWeight: 'bold'
        }}
        {...props}>
        {text}
      </Typography>
      {withEditButton && <EditButton hidden={!withEditButton} onClick={onEditClick} />}
      {withDeleteButton && <DeleteButton hidden={!withDeleteButton} onClick={onDeleteClick} />}
    </Box>
  );
};

export default PageTitle;
