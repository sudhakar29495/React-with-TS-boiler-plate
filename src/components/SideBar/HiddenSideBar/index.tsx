import * as React from 'react';
import './style.css';
import CloseIcon from '../../../assets/images/close.svg';

interface IHiddenSideBarProps {
  isExpanded: boolean,
  onCloseSideBar: any,
  children: any
}

class HiddenSideBar extends React.Component<IHiddenSideBarProps> {
  render() {
    const { isExpanded, children } = this.props;
    return (
      <div className={`right-side-menu ${isExpanded ? 'expanded' : ''}`}>
        <img
          className="close-icon"
          src={CloseIcon}
          alt="close-icon"
          onClick={this.props.onCloseSideBar}
        />
        <div className="right-side-content">
          {
            children
          }
        </div>
      </div>
    );
  }
}

export default HiddenSideBar;
