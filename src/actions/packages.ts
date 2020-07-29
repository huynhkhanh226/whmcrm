import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';
import { IUser } from './users';
var _ = require('lodash');
/**============================================================================ */
export interface IPackage {
    order?: number,
    packageID: string,
    packageName?: string,
    bandwidth: number | string | undefined,
    diskQuota: number | string | undefined,
    maxAddon: number | string | undefined,
    maxSub: number | string | undefined,
    maxFTP: number | string | undefined,
    maxPark: number | string | undefined,
    maxSQL: number | string | undefined,
    price: number,
    [key:string] : any,
}

export interface IRequestPackageAction {
    type: ActionTypes.GET_PACKAGE_REQUEST,
    payload: IPackage[]
}

export interface IResponsePackageAction {
    type: ActionTypes.GET_PACKAGE_RESPONSE,
    payload: IPackage[]
}

const convertPackages = (data: Array<any>): IPackage[] => {
    let result: IPackage[] = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            packageID: data[i].package_id,
            bandwidth: data[i].bandwidth,
            diskQuota: data[i].disk_quota,
            maxAddon: data[i].max_addon,
            maxSub: data[i].max_addon,
            maxFTP: data[i].max_ftp,
            maxPark: data[i].max_park,
            maxSQL: data[i].max_sql,
        } as IPackage
        switch (data[i].package_id) {
            case "vndehvla_LITE":
                item = {
                    ...item,
                    packageName: "LITE",
                    price: 27,
                    order: 1,
                }
                break;
            case "vndehvla_BASIC":
                item = {
                    ...item,
                    packageName: "BASIC",
                    price: 37,
                    order: 2,
                }
                break;
            case "vndehvla_BUSINESS":
                item = {
                    ...item,
                    packageName: "BUSINESS",
                    price: 47,
                    order: 3,
                }
                break;
            case "vndehvla_PREMIUM":
                item = {
                    ...item,
                    packageName: "PREMIUM",
                    price: 57,
                    order: 4,
                }
                break;
        }
        result.push(item);
    }
    return _.orderBy(result, ['order'], ['asc']);
}


export const getPackages = () => {

    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/whm/packages";
        dispatch<IRequestPackageAction>({
            type: ActionTypes.GET_PACKAGE_REQUEST,
            payload: []
        })
        const response = await axios.post(url);
        //convert data
        dispatch<IResponsePackageAction>({
            type: ActionTypes.GET_PACKAGE_RESPONSE,
            payload: convertPackages(response.data.data)
        })
    }
}


export interface IRequestOrderPackageAction {
    type: ActionTypes.ORDER_PACKAGE_REQUEST,
}

export interface IResponseOrderPackage {
    code: number | string,
    data?: any,
    message?: string
}

export interface IResponseOrderPackageAction {
    type: ActionTypes.ORDER_PACKAGE_RESPONSE,
    payload: IResponseOrderPackage
}

export const order = (user: IUser, pkg: IPackage & { domain: string }, cb: (res: IResponseOrderPackage) => void) => {
    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/whm/register";
        dispatch<IRequestOrderPackageAction>({
            type: ActionTypes.GET_PACKAGE_REQUEST,
        })

        const body = {
            username: user.username,
            domain: pkg.domain,
            contactemail: user.email,
            pkgname: pkg.packageID,
            password: user.password,
        }

        const response = await axios.post<IResponseOrderPackage>(url, body);
        //convert data
        dispatch<IResponseOrderPackageAction>({
            type: ActionTypes.ORDER_PACKAGE_RESPONSE,
            payload: response.data
        })

        //callback GUI
        if (cb)
            cb(response.data);
    }
}


