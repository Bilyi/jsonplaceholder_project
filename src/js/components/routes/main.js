import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from  '../posts/posts';
import PostPage from  '../posts/post-page';
import Search from '../search/search';

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Posts location={location}/>
                </Route>
                <Route path='/posts/:id'>
                    <PostPage location={location}/>
                </Route>
                <Route path='/search'>
                    <Search location={location}/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default Main;
