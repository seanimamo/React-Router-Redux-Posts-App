import axios from 'axios';

export const CREATE_POST='SUBMIT_POSTS';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/posts/';
const API_KEY = '?key=seanimamoPosts'

//note if you type export default it wont work
//since we want to route the user back to the main page, only AFTER the post request is completed, we provide ourthis.props.history.push("/") as an arguement to the function and then in the then part of the axios promise we call it.
export function createPost(values,callback){
    const url = `${ROOT_URL}${API_KEY}`;
    var request = axios.post(url, values).then(() => callback() );

    return{
        type: CREATE_POST,
        payload:request
    };
}

