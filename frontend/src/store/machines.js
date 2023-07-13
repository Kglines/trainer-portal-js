import { csrfFetch } from './csrf';

// Action Variables
const GET_MACHINES = 'machines/get';
const CREATE_MACHINES = 'machine/create';
const UPDATE_MACHINES = 'machine/update';
const DELETE_MACHINE = 'machine/delete';

// Actions
// Get/GET
export const getMachines = (machines) => {
    return {
        type: GET_MACHINES,
        payload: machines
    };
};

// Create/POST
export const createMachines = (machine) => {
    return {
        type: CREATE_MACHINES,
        payload: machine
    }
}

// Update/PUT
export const updateMachine = (machine) => {
    return {
        type: UPDATE_MACHINES,
        payload: machine
    };
};

// Delete/DELETE
export const deleteMachine = (machine) => {
    return {
        type: DELETE_MACHINE,
        payload: machine
    };
};

// Action Thunks
// GET Machines
export const fetchGetMachines = () => async (dispatch) => {
    const res = await csrfFetch('/api/machines');

    if(res.ok){
        const machines = await res.json();
        dispatch(getMachines(machines));
        return machines;
    };
    return res;
};

// Create a machine
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

// Update a Machine
export const fetchUpdateMachine = (machine) => async (dispatch) => {
    const res = await csrfFetch(`/api/machines/${machine.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(machine)
    });

    if(res.ok){
        const machine = await res.json();
        dispatch(updateMachine(machine));
        return machine
    };
    return res;
}

// Delete
export const fetchDeleteMachine = (machineId) => async (dispatch) => {
    const res = await csrfFetch(`/api/machines/${machineId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const machine = await res.json();
        dispatch(deleteMachine(machine));
        return machine;
    };
    return res;
}

// Reducer
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
        case UPDATE_MACHINES:
            newState = action.payload;
            return newState;
        case DELETE_MACHINE:
            delete newState[action.payload];
            return newState;
        default:
            return newState
    }
}

export default machinesReducer;
