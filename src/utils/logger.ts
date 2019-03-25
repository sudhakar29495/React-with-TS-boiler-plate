import store from '../';

class Logger {
  public log(message: string) {
    if (this.isDebuggerEnabled()) {
      // tslint:disable-next-line:no-console
      console.log('Log: ', message);
    }
  }

  public info(message: string) {
    if (this.isDebuggerEnabled()) {
      // tslint:disable-next-line:no-console
      console.info('Info: ', message);
    }
  }

  public warn(message: string) {
    if (this.isDebuggerEnabled()) {
      // tslint:disable-next-line:no-console
      console.warn('Warn: ', message);
    }
  }

  public error(message: string, { ...error }: object) {
    if (this.isDebuggerEnabled()) {
      // tslint:disable-next-line:no-console
      console.error('Error: ', message, error);
    }
  }

  private isDebuggerEnabled() {
    const state: any = store.getState();
    // TODO debugger enabling logic to changed
    return state.global.userStatus.loggedIn;
  }
}

export default new Logger();
