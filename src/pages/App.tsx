import * as React from 'react';
import Container from '@mui/system/Container';
import Header from 'components/Header';
import Content from 'components/Content';

const App: React.FC = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }} disableGutters={true}>
      <Header />
      <Container sx={{ display: 'flex', flex: 'auto' }} disableGutters={true}>
        <Content />
      </Container>
    </Container>
  );
};

export default App;
