import * as React from 'react';
import './style.css';

interface INavBarProps {
  expandSideBar: any
}
class NavBar extends React.Component<INavBarProps> {
  render() {
    return (
      <nav className="navbar">
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.props.expandSideBar}
        >
          <i className="fa fa-bars"/>
        </button>
        <div className="float-right">
          <div className="user d-flex align-items-center justify-content-center">
            <span>TS</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;