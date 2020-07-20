//import { FetchToDosAction, DeleteToDoAction } from "./todos";
import { IRequestPackageAction, IResponsePackageAction } from "./packages";

export enum ActionTypes {
    GET_PACKAGE_REQUEST = "GET_PACKAGE_REQUEST",
    GET_PACKAGE_REPONSE = "GET_PACKAGE_REPONSE",

    USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
    USER_REGISTER_REPONSE = "USER_REGISTER_REQUEST",
    USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
    USER_LOGIN_REPONSE = "USER_LOGIN_REPONSE",

    ORDER_PACKAGE_REQUEST = "GET_PACKAGE_REQUEST",
    ORDER_PACKAGE_REPONSE = "GET_PACKAGE_REPONSE",
}

export type Actions = IRequestPackageAction | IResponsePackageAction
