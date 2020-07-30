//import { FetchToDosAction, DeleteToDoAction } from "./todos";
import { IRequestPackageAction, IResponsePackageAction, IRequestGetCoupons, IResponseGetCoupons} from "./packages";
import { IRequestProfileAction, IResponseProfileAction  } from "./users";
import { IAddCartAction, ICartRemoveItemAction, ICartRemoveAllAction } from "./cart";

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


    CART_ADD = "CART_ADD",
    CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
    CART_REMOVE_ALL = "CART_REMOVE_ALL",

    COUPONS_GET_REQUEST = "CART_REMOVE_ALL",
    COUPONS_GET_RESPONSE = "COUPONS_GET_RESPONSE",
}

export type Actions = 
| IRequestPackageAction | IResponsePackageAction 
| IRequestProfileAction | IResponseProfileAction
| IAddCartAction | ICartRemoveItemAction | ICartRemoveAllAction
| IRequestGetCoupons | IResponseGetCoupons
