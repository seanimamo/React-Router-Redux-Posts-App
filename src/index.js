import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise  from 'redux-promise';
import reducers from './reducers';

import App from './components/app';
import PostsIndex from './containers/container_postsIndex';
import NewPost from './containers/container_newPost';
import PostDetail from './containers/container_postDetail';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//the Route tag from react-router-dom is used to define routes, it must be within a <BrowserRouter /> component.
//inorder to define multiple independant routes, you have to place your <Route /> components within a <Switch/> component (also from react-router-dom).
//the <Switch/> component will send you to the first match rather than rendering both routes. thus you put the home route at the bottom.
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={NewPost}/>
          <Route path="/posts/:id" component={PostDetail}/>
          <Route path="/" component={PostsIndex}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
