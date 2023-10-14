const GET_BUSI = "businesses/getbusiness";
const GET_BUSIS = "businesses/getbusinesses";
const CREATE_BUSI = "businesses/createbusiness";
// const GET_USER_BUSIS = "businesses/getUserbusinesses";
const DELETE_BUSI = "businesses/deletebusiness";
const EDIT_BUSI = "businesses/editbusiness";

const getBusisAction = (businesses) => {
    return {
        type: GET_BUSIS,
        businesses
    }
};

const getBusiAction = (business) => {
    return {
        type: GET_BUSI,
        business
    }
};

const createBusiAction = (business) => {
    return {
        type: CREATE_BUSI,
        business
    }
}

const deleteBusiAction = (businessId) => {
    return {
        type: DELETE_BUSI,
        businessId
    }
}

const editBusiAction = (business) => {
    return {
        type: EDIT_BUSI,
        business
    }
}

export const getBusiThunk = (businessId) => async dispatch => {
    const res = await fetch(`/api/businesses/${businessId}`);

    if (res.ok) {
        const busi = await res.json()
        dispatch(getBusiAction(busi))
    }
}

export const getBusisThunk = () => async dispatch => {
    const res = await fetch('/api/businesses')

    if (res.ok) {
        const busis = await res.json();
        dispatch(getBusisAction(busis))
    }
};

export const createBusiThunk = (business, user) => async dispatch => {
    try {
        const res = await fetch('/api/businesses/new', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(song)
            body: business
        })

        if (res.ok) {
            if (!user) throw new Error('Please log in to create a song')
            const newBusi = await res.json();
            dispatch(createBusiAction(newBusi))
            // console.log(newBusi)
            return newBusi;
        }
    } catch (e) {
        const data = await e.json()
        return data;
    }
}

export const deleteBusiThunk = (businessId) => async dispatch => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteBusiAction(businessId))
    }
}

export const editBusiThunk = (payload, busId) => async dispatch => {
    try {
        // console.log('EDIT BUSI FROM THUNK', business)
        const res = await fetch(`/api/businesses/${busId}`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(song)
            body: payload
        })

        if (res.ok) {
            // console.log("HIT RES.OK")
            const business = await res.json();
            dispatch(editBusiAction(business))
            return business;
        }
    } catch (e) {
        const error = await e.json()
        return error;
    }
}

const initialState = {allBusinesses:{}, singleBusiness:{}}
const businessReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_BUSIS: {
            newState = { ...state, allBusinesses: {}, singleBusiness: {} }
            action.businesses.forEach(busi => newState.allBusinesses[busi.id] = busi)
            return newState
        }
        case GET_BUSI: {
            newState = { ...state, allBusinesses: { ...state.allBusinesses }, singleBusiness: {} }
            newState.singleBusiness = action.business;
            return newState;
        }
        case CREATE_BUSI: {
            newState = { ...state, allBusinesses: { ...state.allBusinesses }, singleBusiness: {} }
            console.log('ACTION FROM REDUCER', action.business)
            newState.allBusinesses[action.business.id] = action.business;
            newState.singleBusiness = action.business;
            return newState
        }
        // case GET_USER_BUSIS: {
        //     newState = { ...state, allBusinesses: {}, singleBusiness: {} }
        //     action.businesses.forEach(busi => newState.allBusinesses[busi.id] = busi)
        //     return newState
        // }
        case DELETE_BUSI: {
            newState = { ...state, allBusinesses: { ...state.allBusinesses }, singleBusiness: {} }
            delete newState.allBusinesses[action.businessId]
            return newState
        }
        case EDIT_BUSI: {
            newState = { ...state, allBusinesses: { ...state.allBusinesses }, singleBusiness: {} }
            newState.allBusinesses[action.business.id] = action.business;
            newState.singleBusiness = action.business;
            return newState;
        }
        default:
            return state;
    }
}

export default businessReducer
