import { IPackage, ActionTypes, Actions } from '../actions'
import * as _ from 'lodash';

const initCart = JSON.parse(localStorage.getItem('cart') || '[]');
export const cartReducer = (state: IPackage[] = initCart,
    action: Actions) => {
    var newList: IPackage[];
    switch (action.type) {
        case ActionTypes.CART_ADD:
            newList = [
                ...state,
                action.payload
            ];
            localStorage.setItem("cart", JSON.stringify(newList));
            return newList;
        case ActionTypes.CART_REMOVE_ITEM:
            newList = state.filter((pkg: IPackage)=>{
                return pkg.packageID.toString() != action.payload.packageID.toString();
            })
            localStorage.setItem("cart", JSON.stringify(newList));
            return newList;
        case ActionTypes.CART_REMOVE_ALL:
            return [];
        default:
            return state;
    }
}