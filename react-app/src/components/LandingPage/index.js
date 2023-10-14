import './LandingPage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import BusinessCard from '../BusinessCard';
import RecentActivity from '../RecentActivity';
import { getAllReviewsThunk } from '../../store/review';

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busis = Object.values(busisObj)
    const reviews = useSelector(state =>Object.values(state.reviews.allReviews).reverse())
    // useEffect(() => {
    //     dispatch(getBusisThunk())
    //     // dispatch(getAllReviewsThunk)
    // }, [dispatch])

    useEffect(() => {
        // dispatch(getBusisThunk())
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    console.log(reviews)
    if (!reviews.length) return null
    const reviewsArr = []
    const noRepeats = []
    for (let i = 0; i < 9; i++) {
        if(!reviews[i]) break
        else if(reviews[i].business && !(noRepeats.includes(reviews[i].business.id)))
        {
            noRepeats.push(reviews[i].business.id)
            reviewsArr.push(reviews[i])
        }
    }
    console.log("rev ARR", reviewsArr)
    return (
        <div className='recent-contain'>
            <h1 id='recent-title'>Recent Activity:</h1>
            <div className='flex-contain'>
            <div className="recent-squares">
                {reviewsArr.length && reviewsArr.map(review => (
                    <>
                    <RecentActivity key={review.business.id} review={review} />
                    </>
                ))}
            </div>
            </div>
        </div>
    )
}
