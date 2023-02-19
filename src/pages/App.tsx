import { Component } from 'react';
import Panel from 'components/Panel';
import Header from 'components/Header';
import Content from 'components/Content';
import styles from 'styles/App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.Main}>
          <Panel />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
