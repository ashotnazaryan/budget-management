import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
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
} & BoxProps;

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
    <Box
      display='flex'
      alignItems='center'
      {...props}
      sx={{ ...props.sx, marginTop: 2, marginBottom: 5 }}
    >
      {withBackButton && <BackButton onClick={onBackClick} />}
      <Typography
        color={contrastText}
        sx={{
          width: '100%',
          textAlign: 'center',
          fontSize: { sm: 22, xs: 18 },
          fontWeight: 'bold'
        }}>
        {text}
      </Typography>
      {withEditButton && <EditButton onClick={onEditClick} />}
      {withDeleteButton && <DeleteButton onClick={onDeleteClick} />}
      {withCancelButton && <CancelButton onClick={onCancelClick} />}
    </Box>
  );
};

export default PageTitle;
