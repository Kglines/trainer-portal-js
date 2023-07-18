import { csrfFetch } from './csrf';

const GET_MAINTENANCE = 'maintenance/get';

export const getMaintenance = (maintenance) => {
    return {
        type: GET_MAINTENANCE,
        payload: maintenance
    };
};

export const fetchGetMaintenance = () => async (dispatch) => {
    const res = await csrfFetch('/api/maintenance');

    if(res.ok){
        const maintenance = await res.json();
        dispatch(getMaintenance());
        return maintenance;
    };
    return res;
}

// Reducer
const initialState = {};

const maintenanceReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_MAINTENANCE:
            action.payload.maintenance.forEach(maintenance => newState[maintenance.id] = maintenance);
            return newState;
        default:
            return newState
    }
}

export default maintenanceReducer;
