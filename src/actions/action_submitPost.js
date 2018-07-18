import axios from 'axios';

export const SUBMIT_POSTS='SUBMIT_POSTS';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const API_KEY = '?key=seanimamoPosts'

export default function submitPost(){
    
    const url = `${ROOT_URL}${API_KEY}`;
    var request = axios.post(url);

    return{
        type: SUBMIT_POSTS,
        payload:request
    };


}