import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import AppWrapper from './components/AppWrapper';
import ErrorBoundary from './components/ErrorWrapper';
import './App.css';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

interface IAppProps {
  history: History;
}

const App = ({ history }: IAppProps) => {
  return (
    <div className="appContainer">
      <ErrorBoundary>
        <ConnectedRouter history={history}>
          <AppWrapper/>
        </ConnectedRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
