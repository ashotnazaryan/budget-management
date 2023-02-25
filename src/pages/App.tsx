import { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Header from 'components/Header';
import Content from 'components/Content';
import styles from 'styles/App.module.scss';
import { theme } from 'core/theme.config';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={styles.App}>
          <Header />
          <div className={styles.Main}>
            <Content />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
