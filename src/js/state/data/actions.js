import axios from 'axios';
import {
    SET_DATA,
    SET_POST_DATA,
    REMOVE_DATA,
    CHANGE_POST_FIELD,
    CHANGE_COMMENT_FIELD,
    SEARCH_ELEMENTS,
    DELETE_POST_ITEM,
    DELETE_COMMENT_ITEM,
    ADD_NEW_POST
} from './constants';

const DATA_API = 'http://jsonplaceholder.typicode.com';

export function fetchData(type) {
    return dispatch => {
        return axios.get(`${DATA_API}/${type}`)
            .then(response => {
                dispatch(setData(type, response.data));
            })
            .catch(error => {
                console.log('error', error);
            });
    };
}

export function fetchPostData(pathname) {
    return dispatch => {
        const postPromise = axios.get(`${DATA_API}${pathname}`);
        const commentsPromise = axios.get(`${DATA_API}${pathname}/comments`);
            return axios.all([postPromise, commentsPromise])
            .then(response => {
                const postObj = Object.assign(
                    { post: response[0] && response[0].data ? response[0].data : {} },
                    { comments: response[1] && response[1].data ? response[1].data : [] }
                );
                dispatch(setPostData(postObj));
            })
            .catch(error => {
                console.log('error', error);
            })
    };
}

export function addNewItem(type, item) {
    return dispatch => {
        return axios.post(`${DATA_API}/${type}`, {
                item
            })
            .then(response => {
                const item = {
                    id: response.data.id,
                    ...response.data.item
                };
                if(type === 'posts') {
                    dispatch(saveNewPost(item));
                } else if(type === 'comments') {
                    dispatch()
                }
            })
            .catch(error => {
                console.log('error', error);
            })
    };
}

export function updatePostData(pathname, data) {
    return dispatch => {
        return axios.put(`${DATA_API}${pathname}`, {
                data
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('error', error);
            })
    };
}

export function deleteData(pathname, type, id) {
    return dispatch => {
        return axios.delete(`${DATA_API}${pathname}`)
            .then(response => {
                if(type === 'posts') {
                    dispatch(deletePost(type, id));
                } else if(type === 'activePost') {
                    dispatch(deleteComment(type, id));
                }
            })
            .catch(error => {
                console.log('error', error);
            })
    };
}

export function saveNewPost(post) {
    return {
        type: ADD_NEW_POST,
        payload: post
    }
}

export function deletePost(type, id) {
    return {
        type: DELETE_POST_ITEM,
        payload: {
            type,
            id
        }
    }
}

export function deleteComment(type, id) {
    return {
        type: DELETE_COMMENT_ITEM,
        payload: {
            type,
            id
        }
    }
}

export const searchElements = (value) => {
    return {
        type: SEARCH_ELEMENTS,
        payload: value
    };
};

export const setData = (type, data) => {
    return {
        type: SET_DATA,
        payload: {
            type,
            data
        }
    };
};

export const changePostField = (id, value) => {
    return {
        type: CHANGE_POST_FIELD,
        payload: {
            id,
            value
        }
    }
};

export const changeCommentField = (id, name, value) => {
    return {
        type: CHANGE_COMMENT_FIELD,
        payload: {
            id,
            name,
            value
        }
    }
};

export const setPostData = (data) => {
    return {
        type: SET_POST_DATA,
        payload: data
    };
};

export const removeData = (name) => {
    return {
        type: REMOVE_DATA,
        payload: name
    };
};



