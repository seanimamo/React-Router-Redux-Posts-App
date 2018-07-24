import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/action_fetchPost'
import _ from 'lodash';
import {Link} from 'react-router-dom';

class PostsIndex extends Component{
    
   
    constructor(props){
        super(props);

        this.state = {renderCount: 0}
    }

    //lifecycle function called before render() function for updating react state before redux state without rerendering component.
    static getDerivedStateFromProps(nextProps, prevState ){
        return {renderCount: prevState.renderCount+=1};
    }
    
    //lifecycle function called after component is rendered
    //since we want to render our page first, THEN fetch the data and update the state and thus rerender the page as needed
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPostsList(){
        return _.map( this.props.posts, data => {
                return(
                    <tr key={data.id}>
                    <td><Link to={`posts/${data.id}`} > {data.title} </Link> </td>
                    <td>{data.categories}</td>
                    <td>{data.content}</td>
                </tr>
                );
            });
    }


    render(){
        console.log(`Render Count: ${this.state.renderCount}`);
        if( _.size(this.props.posts) == 0 && this.state.renderCount == 1){
            return(
            <div className="container_postsIndex">
                <h1>Your Posts Index</h1><Link to="/posts/new" className="btn btn-info"> New Post </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Post Title</th>
                            <th>Post Category</th>
                            <th>Post Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={'noPosts'} className="noPosts_postsIndex">
                            <td>Fetching Your Posts. Please Wait... </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            );
        }
        else{
            return( 
                <div className="container_postsIndex">

                <center><h1>Your Posts Index</h1><Link to="/posts/new" className="btn btn-info"> Add a New Post </Link> </center>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Post Title</th>
                                <th>Post Category</th>
                                <th>Post Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPostsList()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

/* Header to be used when install CSS modules for component level css files
           <div className="wrapper_header"> 
                    <div className="header">
                        New Posts
                    </div>
                    <div className="header-sideBar header-right">  
                        <Link to="/posts/new" className="btn btn-info"> New Post </Link>
                    </div>
                    <div className="header-sideBar header-left">  
                        <Link to="/posts/new" className="btn btn-info"> New Post </Link>
                    </div>
                </div

*/

function mapStateToProps(state){
    return {posts: state.posts};
}

//we dont use this function in favor of using the shortcut
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchPosts},dispatch);
// }


//note that this is an action creator shortcut instead of writing the mapDispatchToProps function where we just pass the action creactor directly into the connect function
export default connect(mapStateToProps, { fetchPosts:fetchPosts })(PostsIndex);