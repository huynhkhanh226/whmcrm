import { combineReducers } from 'redux';
import { IPackage} from '../actions';
import { packageReducer } from './packages';
import { cartReducer } from './cart';


export interface IStoreState {
    packages: IPackage[],
    cart: IPackage[],
}
export const reducers = combineReducers<IStoreState>({
    packages: packageReducer,
    cart: cartReducer,
});