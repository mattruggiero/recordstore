
import * as actionTypes from './actions';

const initialState = {
    haveData:false,
    inventory :null,
    bookKeeping:null,
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.LOAD_INVENTORY:
        console.log('LOAD_INVENTORY WAS CALLED SWITCH WORKS');
        return ({
            ...state,
            inventory : [...action.payload],
            haveData:true,
            bookKeeping:action.bookKeeping
        })
        default: return(state);
    }
}


export default reducer;