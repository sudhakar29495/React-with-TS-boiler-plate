import { combineReducers, Reducer } from 'redux';
import { localizeReducer, LocalizeState } from 'react-localize-redux';

const rootReducer: Reducer<IState> = combineReducers({
  localize: localizeReducer as Reducer<any>,
});

export interface IState {
  locale: LocalizeState
}
export default rootReducer;
