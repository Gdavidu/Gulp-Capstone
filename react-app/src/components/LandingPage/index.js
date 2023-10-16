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
    const reviews = useSelector(state => Object.values(state.reviews.allReviews).reverse())
    useEffect(() => {
        dispatch(getBusisThunk())
        // dispatch(getAllReviewsThunk)
    }, [dispatch])

    useEffect(() => {
        // dispatch(getBusisThunk())
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    // console.log(reviews)
    if (!reviews.length) return null
    const reviewsArr = []
    const noRepeats = []
    for (let i = 0; i < 9; i++) {
        if (!reviews[i]) break
        else if (reviews[i].business && !(noRepeats.includes(reviews[i].business.id))) {
            noRepeats.push(reviews[i].business.id)
            reviewsArr.push(reviews[i])
        }
    }
    // console.log("rev ARR", reviewsArr)
    console.log(busis)
    let index = 0;
    function replaceImg() {
        let images = ['https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash5.jpg', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash2.jpg', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash4.jpg']
        let image = document.getElementById('main-image');
        index > 1 ? index = 0 : index++
        image.src = images[index]
        image.text = ''
        image.style.width = '1200px'
        image.style.height = '682px;'
        // let imgRotate = document.getElementById("imageRotation")
        // imgRotate.text=''
    }
    return (
        <>
            <div className='flex-contain'>


                <img src='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash3.jpg' id='main-image'></img>


                {setInterval(replaceImg, 3000)}
                {/* <div className='next-container'>
                <h1 id='next-review'>Your Next Review Awaits:</h1>
            </div> */}
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
            </div>
        </>
    )
}
