import { csrfFetch } from './csrf';

const GET_REPORT_DETAILS = 'reportDetails/get';

export const getReportDetails = (reportDetails) => {
    return {
        type: GET_REPORT_DETAILS,
        payload: reportDetails
    };
};

export const fetchGetReportDetails = () => async (dispatch) => {
    const res = await csrfFetch('/api/report-details');

    if(res.ok){
        const reportDetails = await res.json();
        dispatch(getReportDetails(reportDetails));
        return reportDetails;
    };
    return res;
};

const initialState = {};

const reportDetailsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch(action.type){
        case GET_REPORT_DETAILS:
            newState = action.payload
            console.log('NEW STATE === ', newState)
            return newState;
        default:
            return state;
    };
};

export default reportDetailsReducer;
