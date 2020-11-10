import React, {useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewItem } from '../../state/data/actions';
import { Accordion, Button, Container, Card, Form } from 'react-bootstrap';
import CommentItem from './comment-item';

const Comments = ({ comments, postId, location, addNewItem }) => {
    const [ isCollapsed, setIsCollapsed ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ newComment, setNewComment ] = useState({
        postId: postId,
        email: '',
        name: '',
        body: ''
    });

    const { email, name, body } = newComment;

    const toggleModal = () => {
        if(isCollapsed) {
            setNewComment({
                postId: postId,
                email: '',
                name: '',
                body: ''
            })
        }
        setIsCollapsed(!isCollapsed);
    };

    const changeInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setNewComment({
            ...newComment,
            [id]: value
        });
    };

    const saveNewComment = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            await addNewItem('comments', newComment);
            setNewComment({
                postId: postId,
                email: '',
                name: '',
                body: ''
            });
            setIsDisabled(false);
        } catch (error) {
            console.log('error', e);
        }
    };

    return (
        <Container>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" onClick={toggleModal} eventKey="0">
                            Add new comment
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form onSubmit={saveNewComment}>
                                <Form.Group>
                                    <Form.Label>User email</Form.Label>
                                    <Form.Control required type="email" value={email} onChange={changeInput} id="email"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Post title</Form.Label>
                                    <Form.Control required type="text" value={name} onChange={changeInput} id="name"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Post body</Form.Label>
                                    <Form.Control required as="textarea" value={body} onChange={changeInput} id="body"/>
                                </Form.Group>
                                <Button variant="primary" disabled={isDisabled} type="submit">
                                    Save changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            { comments && comments.length ? (
                comments.map(comment => {
                    return (
                        <CommentItem
                            key={comment.id}
                            comments={comments}
                            comment={comment}
                            location={location}
                        />
                    );
                })) : null
            }
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
        addNewItem: bindActionCreators(addNewItem, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);