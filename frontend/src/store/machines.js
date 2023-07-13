import { csrfFetch } from './csrf';

const GET_MACHINES = 'machines/get';
const CREATE_MACHINES = 'machine/create';

export const getMachines = (machines) => {
    return {
        type: GET_MACHINES,
        payload: machines
    };
};

export const createMachines = (machine) => {
    return {
        type: CREATE_MACHINES,
        payload: machine
    }
}

export const fetchGetMachines = () => async (dispatch) => {
    const res = await csrfFetch('/api/machines');

    if(res.ok){
        const machines = await res.json();
        dispatch(getMachines(machines));
        return machines;
    };
    return res;
};

export const fetchCreateMachines = (machine) => async (dispatch) => {
    const res = await csrfFetch('/api/machines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(machine),
    });

    if(res.ok){
        const machine = await res.json();
        dispatch(createMachines(machine));
        return machine;
    }
    return res;
}

const initialState = {};

const machinesReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_MACHINES:
            // action.payload.machines.forEach(machine => newState[machine.id] = machine);
            newState = action.payload;
            return newState;
        case CREATE_MACHINES:
            newState = { ...state, [action.payload.id]: action.payload };
            return newState
        default:
            return newState
    }
}

export default machinesReducer;
