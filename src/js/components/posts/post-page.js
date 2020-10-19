import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
    fetchPostData,
    removeData,
    changePostField,
    updatePostData
} from '../../state/data/actions';
import Comments from '../comments/comments';


const PostPage = ({
  location,
  fetchPostData,
  activePost,
  removeData,
  changePostField,
  updatePostData
}) => {
    const { pathname } = location;
    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => {
        fetchPostData(pathname);

        return () => {
            removeData('activePost');
        }
    }, []);

    if(!activePost || !Object.keys(activePost).length) {
        return (
            <Container className="text-center">
                <div>Loading...</div>
            </Container>
        );
    }

    const startEditPost = (e) => {
        e.preventDefault();
        setIsEdit(!isEdit);
    };

    const changeInput = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;

        changePostField(id, value);
    };

    const saveChanges = (e) => {
        e.preventDefault();
        updatePostData(pathname, post);
        setIsEdit(!isEdit);
    };

    const { post, comments } = activePost;

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <NavLink
                        className='link'
                        exact to={`/`}
                    >
                        Back to list
                    </NavLink>
                </Col>
                <Col md={{ span: 1, offset: 9 }}>
                    <NavLink
                        className='link'
                        exact to={`/search`}
                    >
                        Search
                    </NavLink>
                </Col>
            </Row>
            { !isEdit ? (
                <Container className="text-center">
                    <Card>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.body}
                            </Card.Text>
                            <Card.Link href="#" id="edit-btn" onClick={startEditPost}>Edit post</Card.Link>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <Form onSubmit={saveChanges}>
                    <Form.Group>
                        <Form.Label>Post title</Form.Label>
                        <Form.Control type="text" id="title" value={post.title} onChange={changeInput}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post body</Form.Label>
                        <Form.Control as="textarea" id="body" value={post.body} onChange={changeInput} rows="3" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </Form>
            )
            }
            <Comments comments={comments} postId={post.id} location={location}/>
        </Container>
    );

};

const mapStateToProps = state => {
    return {
        activePost: state.data.activePost
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPostData: bindActionCreators(fetchPostData, dispatch),
        removeData: bindActionCreators(removeData, dispatch),
        changePostField: bindActionCreators(changePostField, dispatch),
        updatePostData: bindActionCreators(updatePostData, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);