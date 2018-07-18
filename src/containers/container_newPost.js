import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewPost extends Component{
    constructor(props){
        super(props)

        this.state = {
            title:'',
            categories:'',
            content:''
        }
    }

    submitPost(event){
        event.preventDefault();
        console.log("submitting post");
    }

    //<input type="text" className="form-group"  placeholder="title" 
   // value={this.state.searchTerm}
    //onChange={this.onInputChange}/>
    render(){
        return (
            <div>
                <form onSubmit={this.submitPost}>
                <div className="form-group">
                    <label htmlFor="PostTitle1">Post Title</label>
                    <input type="email" className="form-control" id="PostTitle1" aria-describedby="PostTitle" placeholder="Post Title"/>
                    <small id="emailHelp" className="form-text text-muted">Enter the title you would like for your post.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="PostCategory1">Post Category</label>
                    <input type="password" className="form-control" id="PostCategory1" placeholder="Post Category"/>
                    <small id="emailHelp" className="form-text text-muted">Enter the categories you would like for your post seperated by commas.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Post Content</label>
                    <textarea type="password" className="form-control" id="exampleInputPassword1" placeholder="Post Content"/>
                    <small id="emailHelp" className="form-text text-muted">Enter the content you would like for your post.</small>
                </div>
                <span className="">
                    <button className="btn btn-info">Submit Post</button>
                </span>
                </form>
            </div>
        );
    }


}

export default connect(null,null)(NewPost);
