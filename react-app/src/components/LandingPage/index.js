import './LandingPage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import BusinessCard from '../BusinessCard';
import RecentActivity from '../RecentActivity';
import { getAllReviewsThunk } from '../../store/review';
import OpenModalButton from '../OpenModalButton';

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busis = Object.values(busisObj)
    const reviews = useSelector(state => Object.values(state.reviews.allReviews).reverse())

    // window.setInterval(replaceImg, 4000)

    useEffect(() => {
        dispatch(getBusisThunk())
        dispatch(getAllReviewsThunk())
        // dispatch(getAllReviewsThunk)
    }, [dispatch])

    // useEffect(()=>{
    //     setInterval(replaceImg, 4000)
    // },[])

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

    const handleFindRes = (e) => {
        e.preventDefault();
        history.push('/businesses/recent')
      };


    document.getElementById('logo').style.color = 'white'
    document.querySelector('.fa-yelp').style.color = 'white'
    let index = 0;
    let images = ['https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash5.jpg', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash2.jpg', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash4.jpg']


    const replaceImg = ()=>{
        index > 1 ? index = 0 : index++
        // if (document.readyState === "complete" || document.readyState === "loaded") {
            clearInterval(imgCarousel)
            let image = document.getElementById('main-image');
            if (image){
                console.log('hit')
                image.src = images[index]
                image.id = 'main-image'
            }
    //    }
    }

        const imgCarousel = () => {setInterval(replaceImg, 5000)}

        imgCarousel()

        // window.addEventListener("pagehide", clearInterval(imgCarousel), console.log('cleared'))


    return (
        <>
            <div className='hungryboi'>Feeling Hungry?</div>

            <button  className='findRestaurants'
            onClick={handleFindRes}
            >Find Restaurants</button>

            <div className='flex-contain'>

                <img src='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash3.jpg' id='main-image'></img>
                <div className='recent-contain'>
                    <h1 id='recent-act-title'>Recent Activity:</h1>
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
