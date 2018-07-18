import {FETCH_POSTS} from '../actions/action_fetchPost'
import _ from 'lodash';

//note there are two ways of creating an object of attributes with a key containing objects,
//one way is function programming using reduce, and the other is using lodash.

export default function(state = {},action){
    switch (action.type){
        case FETCH_POSTS:
        //console.log('running reducer FETCH_POSTS', 'Payload Is:',action.payload);

        //non-lodash method of creating our object of objects
        //    return action.payload.reduce( (posts,postsAPIObject) => 
        //         posts = posts || {};
        //         posts[postsAPIObject.id] = postsAPIObject;
        //    ,{});

        //lodash method of creating our object of objects
        return _.mapKeys(action.payload.data, 'id');
    default:
        return state;
    }
}