import axios from "axios";

export const FETCH_ONE_POST='FETCH_ONE_POST';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const API_KEY = '?key=seanimamoPosts'

export function fetchOnePost(id){
    const url = `${ROOT_URL}/${id}${API_KEY}`;
    var request = axios.get(url);

    return({
        type:FETCH_ONE_POST,
        payload:request
    })
}