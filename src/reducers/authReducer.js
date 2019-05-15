import * as helper from '../helperFunctions';

import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
    isAuthenticated: false,
    user: {}
};



export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !helper.isEmpty(action.payload),
                user:action.payload
            };
            default: 
                return state;
    }
}