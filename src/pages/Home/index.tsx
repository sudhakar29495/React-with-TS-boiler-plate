import * as React from 'react';
import HiddenSideBar from '../../components/SideBar/HiddenSideBar';

interface IHomeState {
  isExpanded: boolean
}
class Home extends React.PureComponent<any, IHomeState> {
  constructor(props : any) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }
  onCloseSideBar = () => {
    this.setState({
      isExpanded: false
    });
  }
  expandHiddenSideBar = () => {
    this.setState({
      isExpanded: true
    });
  }
  render() {
    const { isExpanded } = this.state;
    return (
      <div>
        <button className="btn btn-primary" onClick={this.expandHiddenSideBar}>
          <i className="fa fa-plus mr-2"/>Add new meter
        </button>
        <HiddenSideBar isExpanded={isExpanded} onCloseSideBar={this.onCloseSideBar}>
          <div>Create a new meter</div>
        </HiddenSideBar>
      </div>
    );
  }
}

export default Home;