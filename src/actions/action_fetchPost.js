import axios from "axios";

export const FETCH_POSTS='FETCH_POSTS';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const API_KEY = '?key=seanimamoPosts'

export function fetchPosts(){
    const url = `${ROOT_URL}${API_KEY}`;
    var request = axios.get(url);

    return{
        type: FETCH_POSTS,
        payload:request
    };
}

