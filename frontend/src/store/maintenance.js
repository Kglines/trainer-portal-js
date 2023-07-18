import { csrfFetch } from './csrf';

// Action Variables
const GET_MAINTENANCE = 'maintenance/get';
const CREATE_MAINTENANCE = 'maintenance/create';
const UPDATE_MAINTENANCE = 'maintenance/update';
const DELETE_MAINTENANCE = 'maintenance/delete';

// Actions
// GET
export const getMaintenance = (maintenance) => {
    return {
        type: GET_MAINTENANCE,
        payload: maintenance
    };
};

// CREATE
export const createMaintenance = (maintenance) => {
    return {
        type: CREATE_MAINTENANCE,
        payload: maintenance
    }
}

// UPDATE
export const updateMaintenance = (maintenance) => {
    return {
        type: UPDATE_MAINTENANCE,
        payload: maintenance
    };
};

export const deleteMaintenance = (maintenance) => {
    return {
        type: DELETE_MAINTENANCE,
        payload: maintenance
    };
};

// Thunks
// GET
export const fetchGetMaintenance = () => async (dispatch) => {
    const res = await csrfFetch('/api/maintenance');

    if(res.ok){
        const maintenance = await res.json();
        dispatch(getMaintenance());
        return maintenance;
    };
    return res;
}

// CREATE
export const fetchCreateMaintenance = (maintenance) => async (dispatch) => {
    const res = csrfFetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenance)
    });

    if(res.ok){
        const maintenance = await res.json();
        dispatch(createMaintenance(maintenance));
        return maintenance;
    };
    return res;
};

// UPDATE
export const fetchUpdateMaintenance = (maintenance) => async (dispatch) => {
    const res = await csrfFetch(`/api/maintenance/${maintenance.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenance)
    });

    if(res.ok){
        const maintenance = await res.json();
        dispatch(updateMaintenance(maintenance));
        return maintenance;
    };
    return res;
};

// DELETE
export const fetchDeleteMaintenance = (maintenanceId) => async (dispatch) => {
    const res = await csrfFetch(`/api/maintenance/${maintenanceId}`, {
        method: 'DELETE'
    });

    if(res.ok){
        const maintenance = await res.json();
        dispatch(deleteMaintenance(maintenance));
        return maintenance;
    };
    return res;
};

// Reducer
const initialState = {};

const maintenanceReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_MAINTENANCE:
            action.payload.maintenance.forEach(maintenance => newState[maintenance.id] = maintenance);
            return newState;
        case CREATE_MAINTENANCE:
            newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        case UPDATE_MAINTENANCE:
            newState = action.payload;
            return newState;
        case DELETE_MAINTENANCE:
            delete newState[action.payload];
            return newState;
        default:
            return newState
    }
}

export default maintenanceReducer;
