import './ReviewEdit.css'
import { useModal } from '../../context/Modal';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editReviewThunk } from '../../store/review';

export default function ReviewEdit({ reviewId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const edit = useSelector(state=>Object.values(state.reviews.business)).filter(review=>review.id===reviewId)[0]
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [errors, setErrors] = useState({})
    const [rating, setRating] = useState(edit.rating)
    const [review, setReview] = useState(edit.review)
    // console.log(edit)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!review) validationErrors.review = 'Please provide a review'
        if (!rating) validationErrors.rating = 'Please provide a rating'
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        const payload = {
            id: reviewId,
            user_id: user_id,
            business_id: edit.business.id,
            rating: rating,
            review: review
        }
console.log(payload)

        try {
            // console.log('FROM REVIEWPOST: ', businessId, payload.user_id)
            await dispatch(editReviewThunk(payload))
            closeModal()
        } catch (error) {
            console.error('Error editing review:', error)
        }
    }
    return (
        <div className="signup-outer-box">
            <div className="signup-box">
                <h1>Write Your Review</h1>
                <form onSubmit={handleSubmit}>
                    <label className='upload-form-elements' >
                        <div className='reviewRating'>Your Rating:
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={index <= rating ? "on" : "off"}
                                        id='stars'
                                        onClick={() => setRating(index)}
                                    >
                                        <span className='starIcon'><i class="fa fa-regular fa-star"></i></span>
                                    </button>
                                );
                            })}
                        </div>
                    </label>
                    {errors.rating && <p className='upload-validators'>{errors.rating}</p>}
                    <label className='upload-form-elements' >
                                Review:
                                <input
                                    className='busi-inputs'
                                    type='text'
                                    placeholder='500 character limit'
                                    value={review}
                                    maxLength='500'
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </label>
                            {errors.review && <p className='upload-validators'>{errors.review}</p>}

                            <button id='upload-btn' type="submit" className='button-orange'>Post Review</button>
                </form>
            </div>
        </div>
    )
}
