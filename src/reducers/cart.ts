import { IPackage, ActionTypes, Actions } from '../actions'
import * as _ from 'lodash';
import PouchDB from 'pouchdb'
export const db = new PouchDB("storeDB");

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
            db.post({cart: newList});
            
            return newList;
        case ActionTypes.CART_REMOVE_ITEM:
            newList = state.filter((pkg: IPackage)=>{
                return pkg.packageId.toString() != action.payload.packageId.toString();
            })
            localStorage.setItem("cart", JSON.stringify(newList));
            db.post({cart: newList});
            return newList;
        case ActionTypes.CART_REMOVE_ALL:
            return [];
        default:
            return state;
    }
}