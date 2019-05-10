import axios from 'axios';
import * as actionTypes from '../store/actions';
import store from '../index';



export async function getResults(searchingForSomething,pageNumber){
    try{
        let url = '/getRecords';
        let postData = searchingForSomething ?
            {searchInput:searchingForSomething+'',pageNumber:pageNumber}:
            {searchInput:false,pageNumber:pageNumber};
        
        let response = await axios({method: 'post',url: url,data:postData});
        console.log(response.data);
        if(!response.data){throw new Error('No results returned')}
        store.dispatch({
            type:actionTypes.DISPLAY_RESULTS,
            searchInput:searchingForSomething,
            payload:response.data.recordData,
            pageNumber: response.data.pageNumber,
            display:'Results',
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
};

export async function registerUser(userData){
    try{
        let url = '/register';
        let postData = userData;

        let response = await axios({method:'post',url:url,data:postData});
        console.log(response);
    }
    catch(error){console.log(error)}
}


