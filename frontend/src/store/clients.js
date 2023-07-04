import { csrfFetch } from './csrf';

// Action Variables
const GET_CLIENTS = 'clients/get';
const CREATE_CLIENT = 'client/create';

// Actions
export const getClients = (clients) => {
    return {
        type: GET_CLIENTS,
        payload: clients
    };
};

export const createClient = (client) => {
    return {
        type: CREATE_CLIENT,
        payload: client
    };
};

// Action Thunks
export const fetchGetClients = () => async (dispatch) => {
    const res = await csrfFetch('/api/clients');

    if(res.ok){
        const clients = await res.json();
        console.log('CLIENTS in STORE === ', clients)
        dispatch(getClients(clients));
        return clients;
    };
    return res;
};

export const fetchCreateClient = (client) => async (dispatch) => {
    const res = await csrfFetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    })

    if(res.ok){
        const client = await res.json();
        dispatch(getClients(client));
        return client;
    };
    return res;
};

const initialState = {};

const clientsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_CLIENTS:
            // action.payload.clients?.forEach(client => newState[client.id] = client);
            newState = action.payload
            return newState;
        case CREATE_CLIENT:
            newState = { ...state, [action.payload.id]: action.payload};
            return newState;
        default:
            return newState;
    };
};

export default clientsReducer;
