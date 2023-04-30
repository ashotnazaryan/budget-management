import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import BackButton from './BackButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import CancelButton from './CancelButton';

type PageTitleProps = {
  text: string;
  withBackButton?: boolean;
  withEditButton?: boolean;
  withDeleteButton?: boolean;
  withCancelButton?: boolean;
  onBackButtonClick?: () => void;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
  onCancelButtonClick?: () => void;
} & TypographyProps;

const PageTitle: React.FC<PageTitleProps> = ({
  text,
  withBackButton = false,
  withEditButton = false,
  withDeleteButton = false,
  withCancelButton = false,
  onBackButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
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

  const onCancelClick = (): void => {
    if (onCancelButtonClick) {
      onCancelButtonClick();
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
          fontSize: { sm: 22, xs: 18 },
          fontWeight: 'bold'
        }}
        {...props}>
        {text}
      </Typography>
      {withEditButton && <EditButton hidden={!withEditButton} onClick={onEditClick} />}
      {withDeleteButton && <DeleteButton hidden={!withDeleteButton} onClick={onDeleteClick} />}
      {withCancelButton && <CancelButton hidden={!withCancelButton} onClick={onCancelClick} />}
    </Box>
  );
};

export default PageTitle;
