//import { FetchToDosAction, DeleteToDoAction } from "./todos";
import { IRequestPackageAction, IResponsePackageAction, IResponseProfileAction, IRequestProfileAction } from "./packages";

export enum ActionTypes {
    GET_PACKAGE_REQUEST = "GET_PACKAGE_REQUEST",
    GET_PACKAGE_RESPONSE = "GET_PACKAGE_RESPONSE",

    USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
    USER_REGISTER_RESPONSE = "USER_REGISTER_RESPONSE",
    USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
    USER_LOGIN_RESPONSE = "USER_LOGIN_RESPONSE",
    USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST",
    USER_PROFILE_RESPONSE = "USER_PROFILE_RESPONSE",

    ORDER_PACKAGE_REQUEST = "GET_PACKAGE_REQUEST",
    ORDER_PACKAGE_RESPONSE = "ORDER_PACKAGE_RESPONSE",
}

export type Actions = IRequestPackageAction | IResponsePackageAction | IRequestProfileAction | IResponseProfileAction
