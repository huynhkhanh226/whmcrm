import { IPackage, ActionTypes, Actions } from '../actions'
var _ = require('lodash');

export const cartReducer = (state: IPackage[] = [],
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.CART_ADD:
            return [
                ...state, 
                action.payload
            ];
        // case ActionTypes.CART_REMOVE_ITEM:
        //     return action.payload
        // case ActionTypes.CART_REMOVE_ALL:
        //     return action.payload
        default:
            return state;
    }
}