import {SET_USER_ACTION} from "$/user"

import fetchHelper from '~/utils/fetchHelper';
import {USER_URL} from '~/consts/urls';

export const updateUser= ()=> dispatchUpdateUser


function dispatchUpdateUser(dispatch) {
    dispatch( { type: SET_USER_ACTION} )

    return fetchHelper.get(USER_URL)
            .then(res => dispatch({
                type: SET_USER_ACTION,
                user: res
            }))
            .catch( err => dispatch({
                type: SET_USER_ACTION,
                err: err
            }))
}





