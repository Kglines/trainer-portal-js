import { csrfFetch } from "./csrf";

const GET_USERS = 'users/get';
const GET_A_USER = 'user/get';
const GET_USERS_REPORTS = 'usersReports/get';

export const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    };
};

export const getAUser = (user) => {
    return {
        type: GET_A_USER,
        payload: user
    };
};

export const getUsersReports = (reports) => {
    return {
        type: GET_USERS_REPORTS,
        payload: reports
    };
};

export const fetchGetUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    
    if (res.ok) {
        const users = await res.json();
        dispatch(getUsers(users));
        return users;
    };

    return res;
};

export const fetchGetAUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`)

    if(res.ok){
        const user = await res.json();
        dispatch(getAUser(user));
        return user;
    };
    return res;
};

export const fetchGetUsersReports = () => async (dispatch) => {
    const res = await csrfFetch('/api/users/monthly-client-reports');

    if(res.ok){
        const usersReports = await res.json();
        dispatch(getUsersReports(usersReports));
        return usersReports;
    };
    return res;
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_USERS:
            // action.payload.users.forEach(user => newState[user.id] = user);
            newState = action.payload
            return newState;
        case GET_A_USER:
            newState = action.payload;
            return newState;
        case GET_USERS_REPORTS:
            action.payload.users.forEach(user => newState[user.id] = user);
            // newState = action.payload;
            return newState;
        default:
            return newState;
    };
};

export default usersReducer;
