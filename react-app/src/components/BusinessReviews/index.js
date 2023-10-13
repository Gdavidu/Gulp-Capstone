import './BusinessReviews.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusReviewsThunk } from "../../store/review";
import OpenModalButton from '../OpenModalButton';

export default function BusinessReviews({business}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviewObj = useSelector(state => state.reviews.business)
    const reviews = Object.values(reviewObj)
    useEffect(() => {
        dispatch(getBusReviewsThunk(business.id))
    }, [dispatch, business.id])
    // console.log(reviews)

    return (
        <div className='review-btn'>
             {sessionUser && (sessionUser.id !== business.user.id) ?
             <OpenModalButton
             buttonText= <i className="fa fa-regular fa-star"> Write a Review</i>
            //  modalComponent={<ReviewPost businessId={business.id}/>}
            >
             </OpenModalButton> : null
             }
        </div>
    )
    }
