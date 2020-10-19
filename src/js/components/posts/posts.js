import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Col,
    Container,
    ListGroup,
    Row,
    Accordion,
    Card,
    Button,
    Form
} from 'react-bootstrap';
import { fetchData, deleteData, addNewItem } from '../../state/data/actions';
import { NavLink } from 'react-router-dom';

import PostItem from './post-item';

const Posts = ({ posts, fetchData, location, deleteData, addNewItem }) => {
    const [ isCollapsed, setIsCollapsed ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ newPost, setNewPost ] = useState({
        userId: 1,
        title: '',
        body: ''
    });

    useEffect(() => {
        fetchData('posts');
    }, []);

    const objectClone = (obj) => {
        const newObj = {};
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(el => {
                if(el && typeof el === 'object') {
                    objectClone(el)
                } else {
                    newObj[el] = obj[el];
                }
            })
        }
        return newObj;
    };

    const { title, body } = newPost;

    const deletePost = (e, id) => {
        e.preventDefault();
        const pathname = `/posts/${id}`;
        deleteData(pathname, 'posts', id);
    };

    const toggleModal = () => {
        if(isCollapsed) {
            setNewPost({
                userId: 1,
                title: '',
                body: ''
            })
        }
        setIsCollapsed(!isCollapsed);
    };

    const saveNewPost = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            await addNewItem('posts', newPost);
            setNewPost({
                userId: 1,
                title: '',
                body: ''
            });
            setIsDisabled(false);
        } catch (error) {
            console.log('error', e);
        }
    };

    const changeField = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setNewPost({
            ...newPost,
            [id]: value
        });
    };

    return (
        <Container>
            <Row>
                <Col md={{ span: 1, offset: 11 }}>
                    <NavLink
                        className='link'
                        exact to={`/search`}
                    >
                        Search
                    </NavLink>
                </Col>
            </Row>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" onClick={toggleModal} eventKey="0">
                            Add new post
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form onSubmit={saveNewPost}>
                                <Form.Group>
                                    <Form.Label>Post title</Form.Label>
                                    <Form.Control required type="text" value={title} onChange={changeField} id="title"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Post body</Form.Label>
                                    <Form.Control required as="textarea" value={body} onChange={changeField} id="body"/>
                                </Form.Group>
                                <Button variant="primary" disabled={isDisabled} type="submit">
                                    Save changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <ListGroup>
            { posts && posts.length ? (
                posts.map(post => {
                    return <PostItem deletePost={deletePost} key={post.id} post={post}/>
                })) : null
            }
            </ListGroup>
        </Container>
    )
};

const mapStateToProps = state => {
    return {
        posts: state.data.posts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch),
        deleteData: bindActionCreators(deleteData, dispatch),
        addNewItem: bindActionCreators(addNewItem, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);