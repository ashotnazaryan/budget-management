import * as React from 'react';
import styles from 'styles/RightContextMenu.module.scss';

interface RightContextMenuProps {
  menuItems: string[];
  areaId: string;
}

interface RightContextMenuState {
  left: string;
  top: string;
  showMenu: boolean;
}

class RightContextMenu extends React.Component<RightContextMenuProps, RightContextMenuState> {
  state = {
    left: '0px',
    top: '0px',
    showMenu: false
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  handleClick = (): void => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  handleContextMenu = (event: MouseEvent): void => {
    if (this.props.areaId !== (event.target as HTMLElement).id) {
      return;
    }

    event.preventDefault();

    this.setState({
      left: `${event.pageX}px`,
      top: `${event.pageY}px`,
      showMenu: true,
    });
  };


  render() {
    const { showMenu, left, top } = this.state;

    if (showMenu) {
      return (
        <div
          className={styles.Menu}
          style={{
            top,
            left
          }}
        >
          {
            this.props.menuItems.map((item) => (
              <div className={styles.MenuItem} key={item}>{item}</div>
            ))
          }
        </div>
      );
    }
    return null;
  }
}

export default RightContextMenu;