import * as React from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import styles from 'styles/App.module.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.Main}>
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
