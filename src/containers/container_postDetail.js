import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchOnePost } from '../actions/action_fetchOnePost';
import {Link} from 'react-router-dom';
import { deletePost } from '../actions/action_deletePost';

class PostDetail extends Component{

    //get our post data after rendering component
    componentDidMount(){
       const { id } = this.props.match.params; 
       this.props.fetchOnePost(id);
    }

    onDeleteClick(){
        const { id } = this.props.match.params; 
        this.props.deletePost(id, () =>{
            this.props.history.push('/');
        });
    }

    render(){
        const {post} = this.props

        if(!post){
            return(<div>Fetching Post...</div>)
        }
        return(
            <div className="container_postDetail ">
                Posts Show! {this.props.match.params.id}
                <h1 className="display-4">{post.title}</h1>
                <p>Categories: {post.categories}</p>
                <hr className="my-4" style={ {borderColor:"white"} } /> 
                <p className="lead">{post.content}</p>    
                <Link to={'/'} className="btn btn-info"> Back</Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>Delete This Post</button>
            </div>

        );
    }
}
//ownProps is the this.props object that is sent to the component when it is rendered
//this.props and ownProps is the same object
//we use ownProps in this case to map the single post we are looking for to a property called post
//so that this component is not reliant on the entire redux posts object array
function mapStateToProps({ posts },ownProps){
    return {post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchOnePost, deletePost})(PostDetail);