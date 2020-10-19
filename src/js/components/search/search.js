import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, ListGroup, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { fetchData, searchElements, removeData } from '../../state/data/actions';
import { NavLink } from 'react-router-dom';

import SearchedItem from './searched-item';

const Search = ({
 searchedItems,
 fetchData,
 location,
 searchElements,
 removeData
}) => {
    useEffect(() => {
        fetchData('posts');
        fetchData('comments');

        return () => {
            removeData('searchedItems');
        }

    }, []);

    const searchItems = (e) => {
        const value = e.target.value;

        if(value.length >= 3) {
            searchElements(value);
        }

        if(!value) {
            removeData('searchedItems');
        }
    };

    return (
        <Container>
            <NavLink
                className='link'
                exact to={`/`}
            >
                Back to list
            </NavLink>
            <InputGroup size="lg">
                <FormControl onChange={searchItems} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            { !searchedItems || !Object.keys(searchedItems).length ? (
                <Container className="text-center">
                    <h1>There will be searched items.</h1>
                </Container>
            ) : (
                <Row>
                    <Col md={6}>
                        <h2 className="text-center">Posts</h2>
                        <ListGroup>
                            { searchedItems.searchedPosts ? (
                                searchedItems.searchedPosts.map(item => {
                                    return <SearchedItem key={item.id} item={item}/>;
                                })) : null
                            }
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <h2 className="text-center">Comments</h2>
                        <ListGroup>
                            { searchedItems.searchedComments ? (
                                searchedItems.searchedComments.map(item => {
                                    return <SearchedItem key={item.id} item={item}/>;
                                })) : null
                            }
                        </ListGroup>
                    </Col>
                </Row>
            )

            }
        </Container>
    )
};

const mapStateToProps = state => {
    return {
        searchedItems: state.data.searchedItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch),
        searchElements: bindActionCreators(searchElements, dispatch),
        removeData: bindActionCreators(removeData, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);