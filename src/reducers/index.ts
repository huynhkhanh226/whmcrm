import { combineReducers } from 'redux';
import { IPackage} from '../actions';
import { packageReducer } from './packages';

export interface IStoreState {
    packages: IPackage[],
}
export const reducers = combineReducers<IStoreState>({
    packages: packageReducer,
});