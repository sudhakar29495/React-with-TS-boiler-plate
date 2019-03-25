import * as React from 'react';
import { Route, Switch } from 'react-router';
import Login from '../pages/Login';
import Home from '../pages/Home';

export class LoggedInRoutes extends React.Component {
  public render() {
    const routes = [
      {
        component: Home,
        exact: true,
        path: '/'
      }
    ];
    return (
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route key={index}
              exact={route.exact}
              path={route.path}
              render={(routeProps) => {
                const SubjectComponent: any = route.component;
                return <SubjectComponent {...routeProps} />;
              }}
            />
          );
        })}
      </Switch>
    );
  }
}

export const persistantRoutes = () => (
  <Switch>
    <Route component={Login} />
  </Switch>
);

