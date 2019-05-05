import axios from 'axios';
import * as actionTypes from '../store/actions';
import store from '../index';



export async function getInventory(){
    try{
        let url = '/browseAll';
        let response = await axios({method: 'get',url: url,});
        console.log(response.data);
        store.dispatch({
            type:actionTypes.LOAD_INVENTORY,
            payload:response.data.recordData,
            bookKeeping: response.data.pageNumber,
            display:'Browse',
        });
        return response.data;
    }
    catch(error){return error;}
};

export async function search(searchInput){
    let url = '/search';
    let response = await axios({method:'post',url:url,data:{searchInput:searchInput}});
    console.log(response);
    
}

