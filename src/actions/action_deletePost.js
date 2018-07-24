import axios from 'axios';

export const DELETE_POST='DELETE_POST';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const API_KEY = '?key=seanimamoPosts'

export function deletePost(id, callback){
    const url = `${ROOT_URL}/${id}${API_KEY}`;
    const request = axios.delete(url)
    .then(() => callback());

    return{
        type: DELETE_POST,
        payload: id
    }

}