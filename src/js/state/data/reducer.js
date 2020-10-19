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

const defaultState = {};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_DATA:
            return Object.assign({}, state, {
                [payload.type]: payload.data
            });
        case ADD_NEW_POST:
            const newPostsList = state.posts ? state.posts : [];
            newPostsList.unshift(payload);
            return Object.assign({}, state, {
                posts: newPostsList
            });
        case DELETE_POST_ITEM:
            const newPostList = state[payload.type] ? state[payload.type].filter(item => item.id !== payload.id) : [];
            return Object.assign({}, state, {
                [payload.type]: newPostList
            });
        case DELETE_COMMENT_ITEM:
            const newCommentsList = state[payload.type] && state[payload.type].comments ?
                state[payload.type].comments.filter(item => item.id !== payload.id) : [];
            return Object.assign({}, state, {
                [payload.type]: {
                    ...state[payload.type],
                    comments: newCommentsList
                }
            });
        case SET_POST_DATA:
            return Object.assign({}, state, {
                activePost: payload
            });
        case REMOVE_DATA:
            return Object.assign({}, state, {
                [payload]: {}
            });
        case CHANGE_POST_FIELD:
            const updatedActivePost = state.activePost && state.activePost.post ? state.activePost.post : {};
            updatedActivePost[payload.id] = payload.value;
            return Object.assign({}, state, {
                activePost: {
                    ...state.activePost,
                    post: updatedActivePost
                }
            });
        case CHANGE_COMMENT_FIELD:
            const updatedActiveComment = state.activePost && state.activePost.comments ? state.activePost.comments : [];
            updatedActiveComment.forEach(comment => {
               if(comment.id === payload.id) {
                   comment[payload.name] = payload.value;
               }
            });
            return Object.assign({}, state, {
                activePost: {
                    ...state.activePost,
                    comments: updatedActiveComment
                }
            });
        case SEARCH_ELEMENTS:
            const searchedPosts = state.posts ?
                state.posts.filter(post => post.title.indexOf(payload) > -1 || post.body.indexOf(payload) > -1 ) : [];
            const searchedComments = state.comments ?
                state.comments.filter(comment => comment.name.indexOf(payload) > -1 || comment.body.indexOf(payload) > -1) : [];
            return Object.assign({}, state, {
                searchedItems: {
                    searchedPosts,
                    searchedComments
                }
            });
        default:
            return state;
    }
};
