import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';

/**============================================================================ */
export interface IPackage {
    packageName: string,
    bandwidth: number | string | undefined,
    diskQuota: number | string | undefined,
    maxAddon: number | string | undefined,
    maxSub: number | string | undefined,
    maxFTP: number | string | undefined,
    maxPark: number | string | undefined,
    maxSQL: number | string | undefined,

    // BWLIMIT: "10000"
    // CGI: "y"
    // CPMOD: "paper_lantern"
    // DIGESTAUTH: "n"
    // FEATURELIST: "default"
    // HASSHELL: "n"
    // IP: "n"
    // LANG: "en"
    // MAXADDON: "unlimited"
    // MAXFTP: "1"
    // MAXLST: "unlimited"
    // MAXPARK: "unlimited"
    // MAXPOP: "1"
    // MAXSQL: "unlimited"
    // MAXSUB: "unlimited"
    // MAX_DEFER_FAIL_PERCENTAGE: "0"
    // MAX_EMAILACCT_QUOTA: "100"
    // MAX_EMAIL_PER_HOUR: "0"
    // QUOTA: "500"
    // name: "vndehvla_BASIC"
}

export interface IRequestPackageAction {
    type: ActionTypes.GET_PACKAGE_REQUEST,
    payload: IPackage[]
}

export interface IResponsePackageAction {
    type: ActionTypes.GET_PACKAGE_REPONSE,
    payload: IPackage[]
}

const convertPackages = (data: Array<any>): IPackage[] => {
    let result: IPackage[] = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            packageName: data[i].name,
            bandwidth: data[i].BWLIMIT,
            diskQuota: data[i].QUOTA,
            maxAddon: data[i].MAXADDON,
            maxSub: data[i].MAXSUB,
            maxFTP: data[i].MAXFTP,
            maxPark: data[i].MAXPARK,
            maxSQL: data[i].MAXSQL,
        } as IPackage
        result.push(item);
    }
    return result;
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
            type: ActionTypes.GET_PACKAGE_REPONSE,
            payload: convertPackages(response.data.data)
        })
    }
}


