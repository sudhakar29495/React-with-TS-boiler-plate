import * as React from 'react';
import './style.css';

const sideMenus = [
  {
    label: 'INVENTORY',
    menus: [
      {
        name: 'All assets',
        icon: 'fa fa-cube'
      },
      {
        name: 'My assets',
        icon: 'fa fa-user-o'
      },
      {
        name: 'Software',
        icon: 'fa fa-apple'
      }
    ]
  },
  {
    label: 'MAINTENANCE',
    menus: [
      {
        name: 'Asset request',
        icon: 'fa fa-cube'
      }
    ]
  },
  {
    label: 'PURCHASE',
    menus: [
      {
        name: 'Log history',
        icon: 'fa fa-cube'
      },
      {
        name: 'Rental',
        icon: 'fa fa-file-o'
      }
    ]
  }
];

interface ISideBarState {
  activeMenu: string;
}

class SideBar extends React.Component<any, ISideBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeMenu: 'All assets'
    };
  }
  setActiveMenu = (activeMenu: string) => {
    this.setState({
      activeMenu
    });
  }
  render() {
    const { activeMenu } = this.state;
    return (
      <div id="accordion">
        {sideMenus.map(sideMenu => (
          <div className="list-group" key={sideMenu.label}>
            <div
              data-toggle="collapse"
              data-target={`#${sideMenu.label}_child`}
              aria-expanded="false"
              aria-controls={`${sideMenu.label}_child`}
              className="label mt-3 mb-0 py-1 pl-4 w-100"
            >
              {sideMenu.label}
            </div>
            <div
              id={`${sideMenu.label}_child`}
              className="collapse"
              aria-labelledby={sideMenu.label}
              data-parent="#accordion"
            >
              {sideMenu.menus.map(menu => (
                <div
                  className={`${activeMenu === menu.name ? 'active' : ''} menu-item m-0 d-flex align-items-center`}
                  key={menu.name}
                  role="presentation"
                  onClick={() => this.setActiveMenu(menu.name)}
                >
                  <i className={`${menu.icon} mr-2`} />
                  <span>{menu.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SideBar;
