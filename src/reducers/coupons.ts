import {  ActionTypes, Actions, ICoupon } from '../actions'

export const couponsReducer = (state: ICoupon[] = [],
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.COUPONS_GET_REQUEST:
            return [];
        case ActionTypes.COUPONS_GET_RESPONSE:
            return action.payload
        default:
            return state;
    }
}