import React from 'react';
import { ListGroup, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const PostItem = ({ post, deletePost }) => {
    if(!post) {
        return null;
    }
    return (
        <ListGroup.Item>
            <Row>
                <Col md={10}>
                <NavLink
                    className='link post-link'
                    exact to={`posts/${post.id}`}
                >
                    {post.title}
                </NavLink>
                </Col>
                <Col>
                    <Card.Link
                        href="#"
                        id="edit-btn"
                        onClick={(e) => deletePost(e, post.id)}
                    >
                        Delete post
                    </Card.Link>
                </Col>
            </Row>
        </ListGroup.Item>
    )
};

export default PostItem;
