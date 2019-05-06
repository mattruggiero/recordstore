
import * as actionTypes from './actions';

const initialState = {
    haveData:false,
    resultsToDisplay :null,
    pageNumber:0,
    display: 'results',
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.DISPLAY_RESULTS:
        console.log('DISPLAY_RESULTS WAS CALLED SWITCH WORKS');
        return ({
            ...state,
            resultsToDisplay : [...action.payload],
            haveData:true,
            pageNumber:action.pageNumber
        })
        default: return(state);
    }
}


export default reducer;