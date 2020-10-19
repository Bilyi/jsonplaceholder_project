import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../../state/data/actions';
import { Container } from 'react-bootstrap';

import Posts from '../posts/posts';

const App = ({ fetchData }) => {

    useEffect(() => {
        fetchData('posts');
        fetchData('comments');
    }, []);

    return (
        <Container>
            <Posts/>
        </Container>
    )
};

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);