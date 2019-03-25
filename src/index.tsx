import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { LocalizeProvider } from 'react-localize-redux';

import App from './App';
import registerServiceWorker from './serviceWorker';
import { setupInterceptors } from './global/interceptors';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

setupInterceptors(store);

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      store
    };
  }

  render() {
    return (
      <Provider store={store}>
        <LocalizeProvider store={this.state.store}>
          <App history={history} />
        </LocalizeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root') as HTMLElement);

registerServiceWorker();

export default store;
