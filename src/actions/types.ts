//import { FetchToDosAction, DeleteToDoAction } from "./todos";
import { IRequestPackageAction, IResponsePackageAction } from "./packages";

export enum ActionTypes {
    GET_PACKAGE_REQUEST = "GET_PACKAGE_REQUEST",
    GET_PACKAGE_REPONSE = "GET_PACKAGE_REPONSE",
}

export type Actions = IRequestPackageAction | IResponsePackageAction
