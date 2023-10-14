const GET_ALL_REVIEWS = "reviews/getReviews";
const GET_BUS_REVIEWS = "reviews/getReviews/:busId";
const CREATE_REVIEW = "reviews/createReview";
const DELETE_REVIEW = "reviews/deleteReview";
const EDIT_REVIEW = "businesses/editReview";

const getBusReviewsAction = (reviews) => {
    return {
        type: GET_BUS_REVIEWS,
        reviews
    }
};

const getAllReviewsAction = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
};

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const getAllReviewsThunk = () => async dispatch => {
    const res = await fetch('/api/reviews')

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviewsAction(reviews))
    }
};

export const getBusReviewsThunk = (businessId) => async dispatch => {
    const res = await fetch(`/api/reviews/${businessId}`)

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getBusReviewsAction(reviews))
    }
};

export const createReviewThunk = ( businessId, payload ) => async dispatch => {
    // console.log('businessId from THUNKY', businessId, ' Also this payload ', payload)
    const res = await fetch(`/api/reviews/${businessId}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(createReviewAction(review))
        return review;
    }
    else {
        return res
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

export const editReviewThunk = (payload) => async dispatch => {
    const newReview = payload;
    const res = await fetch(`/api/reviews/edit/${newReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(editReviewAction(review))
        return review;
    }
    else {
        return res
    }
}

const initialState={allReviews:{}, business:{}}
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            newState = {...state, business: {}, allReviews: {} }
            action.reviews.forEach(review=> newState.allReviews[review.id]=review)
            return newState
        }
        case GET_BUS_REVIEWS: {
            newState = { ...state, business: {}, allReviews: {} }
            action.reviews.forEach(review => newState.business[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            newState = { ...state, business: { ...state.business }, allReviews: {} }
            newState.business[action.review.id] = action.review;
            return newState
        }
        case DELETE_REVIEW: {
            newState = { ...state, business: { ...state.business }, allReviews: {} }
            delete newState.business[action.reviewId]
            return newState
        }
        case EDIT_REVIEW: {
            newState = { ...state, business: { ...state.business }, allReviews: {} }
            newState.business[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;
