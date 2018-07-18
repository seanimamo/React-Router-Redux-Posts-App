import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/action_fetchPost'
import _ from 'lodash';

class PostsIndex extends Component{
    
    //lifecycle function called after component is rendered
    //since we want to render our page first, THEN fetch the data and update the state and thus rerender the page as needed
    constructor(props){
        super(props);

        this.state = {renderCount: 0}
    }

    //lifecycle function called before render() function for updating react state before redux state without rerendering component.
    static getDerivedStateFromProps(nextProps, prevState ){
        return {renderCount: prevState.renderCount+=1};
    }
    
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPostsList(){
        return _.map( this.props.posts, data => {
                return(
                    <tr key={data.id}>
                    <td>{data.title}</td>
                    <td>{data.categories}</td>
                    <td>{data.content}</td>
                </tr>
                );
            });
    }

    isPromise = (object) => (object ? true : false);
    

    render(){
        console.log(`Render Count: ${this.state.renderCount}`);
        if( _.size(this.props.posts) == 0 && this.state.renderCount == 1){
            console.log('1size of props: ', _.size(this.props.posts));
            return(
            <div className="container_postsIndex">
                <h1><center>This is the posts index</center></h1>
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
            console.log('2size of props: ', _.size(this.props.posts));
            return( 
                <div className="container_postsIndex">
                    <h1><center>This is the posts index</center></h1>
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

function mapStateToProps(state){
    return {posts: state.posts};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts},dispatch);
}


//note that this is an action creator shortcut instead of writing the mapDispatchToProps function where we just pass the action creactor directly into the connect function
export default connect(mapStateToProps, { fetchPosts:fetchPosts })(PostsIndex);