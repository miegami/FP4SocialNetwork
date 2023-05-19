import { SET_POSTS, SET_USER_POST, SET_CLEAR_POSTS } from "../types";

const initialState = {
    posts:[]
};

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            console.log(action.payload)
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case SET_CLEAR_POSTS:
            console.log(action.payload)
            return {
                ...state,
                posts: action.payload,
            };
        default:
            return state;
    }
};