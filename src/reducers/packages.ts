import { IPackage, ActionTypes, Actions } from '../actions'

export const packageReducer = (state: IPackage[] = [],
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.GET_PACKAGE_REQUEST:
            return [];
        case ActionTypes.GET_PACKAGE_REPONSE:
            return action.payload
        default:
            return state;
    }
}