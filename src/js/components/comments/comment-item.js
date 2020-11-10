import React, { Fragment, useState } from 'react';
import {Row, Col, NavLink, InputGroup, FormControl, Button, Form, Card} from 'react-bootstrap';
import { changeCommentField, updatePostData, deleteData } from '../../state/data/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const CommentItem = ({
 comment,
 changeCommentField,
 location,
 updatePostData,
 deleteData
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    if(!comment) {
        return null;
    }

    const startEditComment = (e) => {
        e.preventDefault();
        setIsEdit(!isEdit);
    };

    const changeInput = (e) => {
        e.preventDefault();
        const name = e.target.id;
        const value = e.target.value;

        changeCommentField(comment.id, name, value);
    };

    const saveChanges = (e) => {
        e.preventDefault();
        updatePostData(`/comments/${comment.id}`, comment);
        setIsEdit(!isEdit);
    };

    const deleteComment = (e) => {
        e.preventDefault();
        const pathname = `/comments/${comment.id}`;

        deleteData(pathname, 'activePost', comment.id)
    };

    return (
        <Row className="comment-row">
            <Col md={3}>{comment.email}</Col>
            { !isEdit ? (
                <Col md={9}>
                    <Row>
                        <Col md={9}>{comment.name}</Col>
                        <Col md={1}>
                            <NavLink href="#" onClick={startEditComment}>Edit</NavLink>
                        </Col>
                        <Col md={1}>
                            <NavLink href="#" onClick={deleteComment}>Delete</NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>{comment.body}</Col>
                    </Row>
                </Col>
            ) : (
                <Col md={9}>
                    <Form onSubmit={saveChanges}>
                        <Form.Group>
                            <Form.Label>Comment title</Form.Label>
                            <Form.Control type="text" id="name" value={comment.name} onChange={changeInput}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comment body</Form.Label>
                            <Form.Control as="textarea" id="body" value={comment.body} onChange={changeInput} rows="3" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </Form>
                </Col>
            )
            }
        </Row>
    )
};

const mapStateToProps = state => {
    return {
        activePost: state.data.activePost
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeCommentField: bindActionCreators(changeCommentField, dispatch),
        updatePostData: bindActionCreators(updatePostData, dispatch),
        deleteData: bindActionCreators(deleteData, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);