import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SearchedItem = ({ item }) => {
    if(!item) {
        return null;
    }
    const title = item.postId ? item.name : item.title;
    const id = item.postId ? item.postId : item.id;
    return (
        <ListGroup.Item>
            <NavLink
                className='link'
                exact to={`posts/${id}`}
            >
                <Row>
                    <Col>{title}</Col>
                </Row>
            </NavLink>
        </ListGroup.Item>
    )
};

export default SearchedItem;
