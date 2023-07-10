import { csrfFetch } from './csrf';

const GET_MACHINES = 'machines/get';

export const getMachines = (machines) => {
    return {
        type: GET_MACHINES,
        payload: machines
    };
};

export const fetchGetMachines = () => async (dispatch) => {
    const res = await csrfFetch('/api/machines');

    if(res.ok){
        const machines = await res.json();
        dispatch(getMachines(machines));
        return machines;
    };
    return res;
};

const initialState = {};

const machinesReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_MACHINES:
            // action.payload.machines.forEach(machine => newState[machine.id] = machine);
            newState = action.payload;
            return newState;
        default:
            return newState
    }
}

export default machinesReducer;
