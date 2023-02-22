import { Component } from 'react';
import { MENU_ITEMS } from 'shared/constants';
import RightContextMenu from 'shared/components/RightContextMenu';
import styles from 'styles/Content.module.scss';

class Content extends Component {
  private get areaId(): string {
    return 'content';
  }

  private get menuItems(): string[] {
    return MENU_ITEMS;
  }

  render() {
    return (
      <div id={this.areaId} className={styles.Content}>
        <RightContextMenu areaId={this.areaId} menuItems={this.menuItems} />
      </div>
    );
  }
}

export default Content; 