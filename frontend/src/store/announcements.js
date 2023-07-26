import { csrfFetch } from './csrf';

// Action Variables
const GET_ALL_ANNOUNCEMENTS = 'announcements/get';
const CREATE_ANNOUNCEMENT = 'announcement/create';
const EDIT_ANNOUNCEMENT = 'announcement/edit';
const DELETE_ANNOUNCEMENT = 'announcement/delete';

// Actions
export const getAnnouncements = (announcements) => {
    return {
        type: GET_ALL_ANNOUNCEMENTS,
        payload: announcements
    };
};

export const createAnnouncement = (announcement) => {
    return {
        type: CREATE_ANNOUNCEMENT,
        payload: announcement
    };
};

export const editAnnouncement = (announcement) => {
    return {
        type: EDIT_ANNOUNCEMENT,
        payload: announcement
    };
};

export const deleteAnnouncement = (announcement) => {
    return {
        type: DELETE_ANNOUNCEMENT,
        payload: announcement
    };
};

// Action Thunks
export const fetchGetAnnouncements = () => async (dispatch) => {
    const res = await csrfFetch('/api/announcements');
    if (res.ok) {
        const announcements = await res.json();
        dispatch(getAnnouncements(announcements));
        return announcements;
    };
    return res;
};

export const fetchCreateAnnouncement = (announcement) => async (dispatch) => {
    const res = await csrfFetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
    });
    
    if(res.ok){
        const announcement = await res.json();
        dispatch(createAnnouncement(announcement));
        return announcement;
    };
    return res;
};

export const fetchEditAnnouncement = (announcement) => async (dispatch) => {
    const res = await csrfFetch(`/api/announcements/${announcement?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
    })

    if(res.ok){
        const announcement = await res.json();
        dispatch(editAnnouncement(announcement));
        return announcement;
    };
    return res;
};

export const fetchDeleteAnnouncement = (announcementId) => async (dispatch) => {
    const res = await csrfFetch(`/api/announcements/${announcementId}`, {
        method: 'DELETE'
    })
    
    if (res.ok) {
        const announcement = await res.json();
        dispatch(deleteAnnouncement(announcement));
        return announcement;
    };
    return res;
};

// Reducer
const initialState = {};

const announcementsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_ALL_ANNOUNCEMENTS:
            action.payload.announcements?.forEach(announcement => newState[announcement?.id] = announcement)
            return newState;
        case CREATE_ANNOUNCEMENT:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState;
        case EDIT_ANNOUNCEMENT:
            newState = action.payload;
            return newState;
        case DELETE_ANNOUNCEMENT:
            delete newState[action.payload];
            return newState;
        default:
            return newState;
    };
};

export default announcementsReducer;
