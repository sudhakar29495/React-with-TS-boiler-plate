import * as React from 'react';
import { Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'redux';
// import { updateLoggedInStatus } from '../../actions/global';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { AppProperties } from '../../constants/application.properties';
import { languages } from '../../global/languages';
import { IState } from '../../reducers';
import {
  LoggedInRoutes,
  persistantRoutes as PersistantRoutes
} from '../../routes';
import storage from '../../utils/storage';
// import LoaderComponent from '../Loader/index';
import './index.css';

interface IAppWrapperProps extends LocalizeContextProps {
  isUserLoggedIn: boolean;
  loadingInProgress: number;
  loading: boolean;
}

interface IAppWrapperState {
  isExpanded: boolean;
  status: string;
}

class AppWrapper extends React.Component<IAppWrapperProps, IAppWrapperState> {
  public currentLanguage : any = storage.getObject(AppProperties.SELECTED_LANGUAGE_KEY);
  constructor(props: IAppWrapperProps) {
    super(props);
    this.state = {
      isExpanded: false,
      status: ''
    };
    const activeLanguage = this.currentLanguage ? this.currentLanguage : AppProperties.DEFAULT_LANGUAGE;
    this.props.initialize({
      languages,
      options: { renderToStaticMarkup },
      translation: require(`../../translations/${activeLanguage.code}.welcome.json`)
    });
    // Enabling default language by getting it from localstorage
    this.props.setActiveLanguage(activeLanguage.code);
    this.addTranslationsForActiveLanguage(activeLanguage);
  }

  public componentDidMount() {
    const isExpanded = storage.getItem(AppProperties.SIDEBAR_EXPANDED);
    if (isExpanded === 'true') {
      this.setState({ isExpanded: true });
    }
  }

  public render() {
    // const { isUserLoggedIn, loadingInProgress, loading } = this.props;
    const { isExpanded } = this.state;
    const isUserLoggedIn = true;
    return (
      <Fragment>
        {isUserLoggedIn && (
          <Fragment>
            <NavBar expandSideBar={this.expandSideBar}/>
            {/* {loadingInProgress > 0 && <LoaderComponent loading={loading} />} */}
              <div className="container-section p-0 row">
                <div className={isExpanded ? 'side-menu expand' : 'side-menu'}>
                  <SideBar />
                </div>
                <div key="mainContainer" className={isExpanded ? 'main expand' : 'main'}>
                  <LoggedInRoutes key="logged-in-routes"/>
                </div>
              </div>
          </Fragment>
        ) ||
        <PersistantRoutes/>}
        <ToastContainer/>
      </Fragment>
    );
  }

  public componentDidUpdate(prevProps: any) {
    const hasActiveLanguageChanged =
      prevProps.activeLanguage && prevProps.activeLanguage !== this.props.activeLanguage;
    if (hasActiveLanguageChanged) {
      this.addTranslationsForActiveLanguage(this.props.activeLanguage);
    }
  }

  private expandSideBar = () => {
    this.setState({isExpanded: !this.state.isExpanded});
    storage.setItem(AppProperties.SIDEBAR_EXPANDED, !this.state.isExpanded);
  }

  private addTranslationsForActiveLanguage(activeLanguage: any) {
    this.props.addTranslationForLanguage(require(`../../translations/${activeLanguage.code}.welcome.json`), activeLanguage.code);
  }

}

const mapStateToProps = (state: IState): IStateProps => ({
  // isUserLoggedIn: state.global.userStatus.loggedIn,
  // loading: state.global.loader.loading,
  // loadingInProgress: state.global.loader.loadInProgress
});

const mapDispatchToProps : IDispatchProps = ({
  // updateLoggedInStatus
});

interface IStateProps {
  // isUserLoggedIn: boolean;
  // loadingInProgress: number;
  // loading: boolean;
}

interface IDispatchProps {
  // updateLoggedInStatus: (userStatus: any) => void;
}

export default compose(
  withRouter,
  withLocalize,
  connect<IStateProps, IDispatchProps, IAppWrapperProps, IState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppWrapper) as React.ComponentType<any>;
