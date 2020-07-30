import { combineReducers } from 'redux';
import { IPackage, ICoupon} from '../actions';
import { packageReducer } from './packages';
import { cartReducer } from './cart';
import { couponsReducer } from './coupons';


export interface IStoreState {
    packages: IPackage[],
    cart: IPackage[],
    coupons: ICoupon[],
}
export const reducers = combineReducers<IStoreState>({
    packages: packageReducer,
    cart: cartReducer,
    coupons: couponsReducer
});