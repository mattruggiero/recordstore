import axios from 'axios';



export async function browseAll(){
    try{
        let url = '/browseAll';
        let response = await axios({method: 'get',url: url,});
        console.log(response.data);
        return response.data;
    }
    catch(error){return error;}
}