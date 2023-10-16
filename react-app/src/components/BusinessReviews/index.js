import './BusinessReviews.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusReviewsThunk } from "../../store/review";
import OpenModalButton from '../OpenModalButton';
import ReviewPost from '../ReviewPost';
import ReviewDelete from '../ReviewDelete';
import ReviewEdit from '../ReviewEdit';

export default function BusinessReviews({ business }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviewObj = useSelector(state => state.reviews.business)
    const reviews = Object.values(reviewObj)
    useEffect(() => {
        dispatch(getBusReviewsThunk(business.id))
    }, [dispatch, business.id])
    // console.log('REVIEWS FROM BUSREVIEWS: ', reviews)

    let reviewed = false;
    for (let i = 0; i < reviews.length; i++) {
        if (reviews && reviews[i].user && reviews[i].user.id === sessionUser.id) {
            reviewed = true
            break;
        }
    }

    return (
        <>
    {sessionUser.id == business.owner_id ? <div id='urbusi'>This is your business (you cannot review your own business)!</div>: null}
            <div className='review-btn'>
                {sessionUser && (sessionUser.id !== business.owner_id) && !reviewed ?
                    <OpenModalButton
                        buttonClass='button-nav'
                        buttonText=<i className="fa fa-light fa-star"> Write a Review</i>
                        modalComponent={<ReviewPost businessId={business.id} />}
                    >
                    </OpenModalButton> : null
                }

            </div>
            <h1>Reviews:</h1>
            <div className='bus-reviews'>
                {reviews.length > 0 && reviews.slice().reverse().map(review => {

                    const year = review.created_at.split(" ")[3]
                    const date = review.created_at.split(" ")[1]
                    const month = review.created_at.split(" ")[2]

                    return (
                        <>
                            <div key={review.id} className="one-review-box">
                                <h4 id='date-name'>{review.user.firstname} {review.user.lastname[0].toUpperCase()}.</h4>
                                <h5 id='date-rev'>
                                    {month} {date}, {year}
                                </h5>
                                <p className='review-text'>{review.review}</p>
                                <div id='single-rating'>{[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span key={index} className={index <= review.rating ? "on" : "off"}>
                        <i class="fa fa-regular fa-star"></i>
                    </span>
                );
            })}</div>
                                <div className="review-buttons">
                                    <div id='deletebtn'>
                                        {sessionUser && sessionUser.id === review.user.id && <OpenModalButton
                                            buttonClass='delete-btn'
                                            buttonText=<i className="fa-solid fa-trash"> Delete</i>
                                            modalComponent={<ReviewDelete reviewId={review.id} />}
                                        />}
                                    </div>
                                    <div id='editbtn'>
                                        {sessionUser && sessionUser.id === review.user.id && <OpenModalButton
                                            buttonClass='edit-btn'
                                            buttonText=<i className="fa-solid fa-pen-nib"> Edit</i>
                                            modalComponent={<ReviewEdit reviewId={review.id} />}
                                        />}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>

    )

}
