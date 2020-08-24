import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';
import { IUser } from './users';
var _ = require('lodash');
/**============================================================================ */
export interface ICategory {
    id: number,
    categoryName: string,
    description?: string,
}

export interface ICategoryValues {
    id?: number,
    categoryName: string,
    description?: string,
}

export interface IPostGetRequestAction {
    type: ActionTypes.POST_GET_REQUEST,
    payload: ICategory[]
}

export interface IPostGetResponseAction {
    type: ActionTypes.POST_GET_RESPONSE,
    payload: ICategory[]
}

export const getPackages = () => {
    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/category/get";
        dispatch<IPostGetRequestAction>({
            type: ActionTypes.POST_GET_REQUEST,
            payload: []
        })
        const response = await axios.post(url);
        dispatch<IPostGetResponseAction>({
            type: ActionTypes.POST_GET_RESPONSE,
            payload: response.data.data
        })
    }
}

/**============================= */
export interface IPostSaveRequestAction {
    type: ActionTypes.POST_SAVE_REQUEST,
    payload: {
        isSaving: boolean
    }
}

export interface IPostSaveResponseAction {
    type: ActionTypes.POST_GET_RESPONSE,
    payload: {
        isSaving: boolean
    }
}

export interface IResponse<T> {
    code: number,
    message: string,
    data: T
}

export const saveCategory = (data: ICategoryValues, cb: (response: IResponse<ICategory>) => void) => {
    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/category/save";
        dispatch<IPostSaveRequestAction>({
            type: ActionTypes.POST_SAVE_REQUEST,
            payload: {
                isSaving: true
            }
        })
        const response = await axios.post<IResponse<ICategory>>(url);
        dispatch<IPostSaveResponseAction>({
            type: ActionTypes.POST_GET_RESPONSE,
            payload: {
                isSaving: false
            }
        })

        if (cb)
            cb(response.data)
    }
}







