import {
    UPDATE_USER_DATA_USERNAME,
    UPDATE_USER_PASSWORD,
    UPDATE_REMEMBER_ME_ACTION,
    SAVE_USER_TOKEN,
    OPEN_SIGN_UP_MODAL,
    SET_USER_ID, SET_POSTS,
    GET_USERS_SUCCESS,
    OPEN_LOGIN_MODAL,
    CLOSE_SIGN_UP_MODAL,
    CLOSE_LOGIN_MODAL,
    DELETE_USERS_SUCCESS,
    SET_PAGE, SET_CLEAR_POSTS
} from "./types";

export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

export const setUserEmail = (userData) => ({
    type: UPDATE_USER_DATA_USERNAME,
    payload: userData,
});

export const setUserPassword = (userData) => ({
    type: UPDATE_USER_PASSWORD,
    payload: userData,
});

export const setRememberMeAction = () => ({
    type: UPDATE_REMEMBER_ME_ACTION,
});

export const setUserToken = (userToken) => ({
    type: SAVE_USER_TOKEN,
    payload: { userToken },
});

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId,
});

export const openSignUpModal = () => ({
    type: OPEN_SIGN_UP_MODAL
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL
});
export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL
});
export const closeSignUpModal = () => ({
    type: CLOSE_SIGN_UP_MODAL
});
export const GetUsersSuccess = (data) => ({
    type: GET_USERS_SUCCESS,
    payload: { users: data.search }
});
export const DeleteUsersSuccess = () => ({
    type: DELETE_USERS_SUCCESS
});

export const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts,
});

export const setUserPostsClear = (posts) => ({
    type: SET_CLEAR_POSTS, payload: posts
});

export const fetchPostsByUserId = (userId, page) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/posts?userId=${userId}&page=${page}`);
        return await response.json();
    };
};

export const fetchPostsByPage = (page) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/posts?page=${page}`);
        return await response.json();
    };
};

export const sendEmailCheckRequest = (values) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:8080/checkEmail", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            return response;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    };
};


