import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchOnePost } from '../actions/action_fetchOnePost';

class PostDetail extends Component{

    //get our post data after rendering component
    componentDidMount(){
       // this.props.fetchOnePost(this.props.params.id);
    }

    render(){
        return(
            <div className="container_postDetail">
                Posts Show! {this.props.params.id}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {post: state.posts}
}

export default connect(mapStateToProps,{fetchOnePost})(PostDetail);