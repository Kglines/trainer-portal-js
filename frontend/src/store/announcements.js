import { csrfFetch } from './csrf';

const GET_ALL_ANNOUNCEMENTS = 'announcements/get';

export const getAnnouncements = (announcements) => {
    return {
        type: GET_ALL_ANNOUNCEMENTS,
        payload: announcements
    };
};

export const fetchGetAnnouncements = () => async (dispatch) => {
    const res = await csrfFetch('/api/announcements');

    if (res.ok) {
        const announcements = await res.json();
        dispatch(getAnnouncements(announcements));
        return announcements;
    };
    return res;
};

const initialState = {};

const announcementsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_ALL_ANNOUNCEMENTS:
            action.payload.announcements.forEach(announcement => newState[announcement.id] = announcement)
            return newState;
        default:
            return newState;
    };
};

export default announcementsReducer;
