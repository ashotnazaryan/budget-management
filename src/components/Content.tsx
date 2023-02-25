import { Component } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StyledContent from './Content.styles';

class Content extends Component {
  render() {
    return (
      <StyledContent sx={{ display: 'flex', flex: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 300,
              height: 200,
            },
          }}
        >
          <Paper elevation={3} />
        </Box>
      </StyledContent>
    );
  }
}

export default Content; 