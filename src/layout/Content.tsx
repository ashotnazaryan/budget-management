import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Header from './Header';
import SideBar from './SideBar';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const { palette: { info: { light } } } = useTheme();

  return (
    <Box display='flex' flexDirection='column' flexGrow={1} sx={{ overflowX: 'hidden', backgroundColor: light }}>
      <Header />
      <SideBar variant='temporary' />
      <Grid container display='flex' justifyContent='center' flexGrow={1}>
        <Grid item display='flex' md={8} xs={12}>
          <Box display='flex' flexGrow={1} sx={{
            paddingY: 2,
            paddingX: 3
          }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
