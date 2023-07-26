import { csrfFetch } from './csrf';

const GET_MONTHLY_CLIENT_REPORTS = 'monthlyClientReports/get';
const CREATE_MONTHLY_CLIENT_REPORTS = 'monthlyClientReports/create';

export const getMonthlyClientReports = (reports) => {
    return {
        type: GET_MONTHLY_CLIENT_REPORTS,
        payload: reports
    };
};

export const createMonthlyClientReports = (reports) => {
    return {
        type: CREATE_MONTHLY_CLIENT_REPORTS,
        payload: reports
    }
}

export const fetchGetMonthlyClientReports = () => async (dispatch) => {
    const res = await csrfFetch('/api/monthly-client-reports');
    console.log('GET REPORTS RES === ', res)
    if(res.ok){
        const monthlyClientReports = await res.json();
        console.log('REPORTS IN THE THUNK === ', monthlyClientReports)
        dispatch(getMonthlyClientReports(monthlyClientReports));
        return monthlyClientReports;
    };
    return res;
};

export const fetchCreateMonthlyClientReports = (report) => async (dispatch) => {
    const res = await csrfFetch('/api/monthly-client-reports', {
        method: 'POST',
        header: { 'Content-Type': 'application/json'},
        body: JSON.stringify(report)
    })

    if (res.ok){
        const report = await res.json();
        dispatch(createMonthlyClientReports(report));
        return report;
    };
    return res;
};

const initialState = {};

const monthlyClientReportsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
      case GET_MONTHLY_CLIENT_REPORTS:
        // action.payload.monthlyClientReports?.forEach(report => newState[report?.id] = report);
        newState = action.payload.monthlyClientReports;
        console.log('NEW STATE === ', newState);
        return newState;
      case CREATE_MONTHLY_CLIENT_REPORTS:
        newState = { ...state, [action.payload.id]: action.payload };
        return newState;
      default:
        return newState;
    };
};

export default monthlyClientReportsReducer;
