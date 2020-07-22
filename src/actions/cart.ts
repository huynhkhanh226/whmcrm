import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';
import { IUser } from './users';
import { IPackage } from './packages';

var _ = require('lodash');
/**============================================================================ */

export interface IAddCartAction {
    type: ActionTypes.CART_ADD,
    payload: IPackage,
}

export interface ICartRemoveItemAction {
    type: ActionTypes.CART_REMOVE_ITEM,
    payload: IPackage,
}

export interface ICartRemoveAllAction {
    type: ActionTypes.CART_REMOVE_ALL,
}


export const addCart = (pkg: IPackage, cb: (res: { status: string, message: string }) => void) => {
    return async (dispatch: Dispatch) => {
        dispatch<IAddCartAction>({
            type: ActionTypes.CART_ADD,
            payload: pkg
        })

        if (cb)
            cb(
                {
                    status: "OK",
                    message: "Bạn đã thêm sản phẩm vào giỏ hàng thành công"
                }
            );
    }
}

export const removePackage = (pkg: IPackage, cb: (res: { status: string, message: string }) => void) => {
    return async (dispatch: Dispatch) => {
        dispatch<ICartRemoveItemAction>({
            type: ActionTypes.CART_REMOVE_ITEM,
            payload: pkg
        })

        if (cb)
            cb(
                {
                    status: "OK",
                    message: "Bạn đã thêm sản phẩm vào giỏ hàng thành công"
                }
            );
    }
}

export const removeAllPackage = (pkg: IPackage, cb: (res: { status: string, message: string }) => void) => {
    return async (dispatch: Dispatch) => {
        dispatch<ICartRemoveAllAction>({
            type: ActionTypes.CART_REMOVE_ALL,
        })

        if (cb)
            cb(
                {
                    status: "OK",
                    message: "Bạn đã thêm sản phẩm vào giỏ hàng thành công"
                }
            );
    }
}



