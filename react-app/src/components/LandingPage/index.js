import './LandingPage.css'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect, useCallback} from "react";
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
    let [count, setCount] = useState(0)
    let [img, setImg] = useState('https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/sp.jpg')
    document.getElementById('logo').style.color = 'white'
    document.querySelector('.fa-yelp').style.color = 'white'
    const carousel = useCallback(()=>{
        let images = ['https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash3.jpg','https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/sp3new.jpg','https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash5new.webp','https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/spreadnew.jpg','https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/sp7.webp','https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/sp4new.webp', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash2.jpg', 'https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/splash4.jpg']
        setImg(images[count])
        setCount(count+1)
        if(count+1 === images.length) setCount(0)
    },[count])

    useEffect(() => {
        const interval = setInterval(()=>carousel(), 4500)
        return ()=> clearInterval(interval)
    }, [img,count,carousel])
    // // window.setInterval(replaceImg, 4000)

    useEffect(() => {
        dispatch(getBusisThunk())
        dispatch(getAllReviewsThunk())
        // dispatch(getAllReviewsThunk)
    }, [dispatch])





    // let index = 0;
    // const replaceImg = ()=>{
    //     index > 1 ? index = 0 : index++
    //     // if (document.readyState === "complete" || document.readyState === "loaded") {
    //         // if (imgCarousel) clearInterval(imgCarousel)
    //         let image = document.getElementById('main-image');
    //         if (image){
    //             console.log('hit')
    //             image.src = images[index]
    //             image.id = 'main-image'
    //         }
    // //    }
    // }
    //     if (imgCarousel) clearInterval(imgCarousel)
    //     imgCarousel = setInterval(replaceImg, 5000)

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







        // window.addEventListener("pagehide", clearInterval(imgCarousel), console.log('cleared'))


    return (
        <>
            <div className='hungryboi'>Who's a hungry boy?</div>

            <button  className='findRestaurants'
            onClick={handleFindRes}
            >Find Restaurants</button>

            <div className='flex-contain'>

                <img src={img} id='main-image'></img>
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
