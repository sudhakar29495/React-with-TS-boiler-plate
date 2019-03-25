import * as React from 'react';
import Logger from '../../utils/logger';

interface IErrorBoundaryState {
  hasError: boolean;
}

/**
 * Defauilt Error Handler component in application level
 * to show fallback UI.
 */
class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    // tslint:disable-next-line:no-console
    Logger.error(info, error);
    // Display fallback UI
    /** You can also log the error to an error reporting service
     * logErrorToMyService(error, info);
     */
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <div
            style={{
              paddingBottom: '20px',
              paddingTop: '20px'
            }}
          >
            <h3>SomeThing Wrong from our side :(</h3>
            <p>Kindly try again later...!!!</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
