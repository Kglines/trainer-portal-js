import { csrfFetch } from './csrf';

const GET_MONTHLY_CLIENT_REPORTS = 'monthlyClientReports/get';

export const getMonthlyClientReports = (reports) => {
    return {
        type: GET_MONTHLY_CLIENT_REPORTS,
        payload: reports
    };
};

export const fetchGetMonthlyClientReports = () => async (dispatch) => {
    const res = await csrfFetch('/monthly-client-reports');

    if(res.ok){
        const monthlyClientReports = await res.json();
        dispatch(getMonthlyClientReports(monthlyClientReports));
        return monthlyClientReports;
    };
    return res;
};

const initialState = {};

const monthlyClientReportsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        default:
            return newState;
    };
};

export default monthlyClientReportsReducer;
