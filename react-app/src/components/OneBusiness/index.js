import './OneBusiness.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiThunk } from "../../store/business";
import BusinessReviews from '../BusinessReviews';

export default function OneBusiness() {
    const { busiId } = useParams();
    const dispatch = useDispatch();
    const busi = useSelector(state => state.businesses.singleBusiness);
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews.business))
    useEffect(() => {
        dispatch(getBusiThunk(busiId))
    }, [dispatch])

    let ratingSum = 0;
    for (let i = 0; i < reviews.length; i++) {
        ratingSum += reviews[i].rating
    }
    const ratingTotal = Math.floor(ratingSum / reviews.length)

    if (!busi) return null
    if (!busi.id) return null
    // console.log(ratingTotal)
    document.getElementById('logo').style.color = '#FF1A1A'
    document.querySelector('.fa-yelp').style.color = '#FF1A1A'
    return (

        <div className="detail-page">
            <header id="header-wrap">
                <h1 id="bus-name">{busi.name}</h1>
                <div className="stars-ctnr">
                    {reviews.length ? [...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <span key={index} className={index <= ratingTotal ? "on-one-bus" : "off"}>
                                <i class="fa fa-regular fa-star fa-2xl"></i>
                            </span>
                        );
                    }) : <div>No reviews yet</div>}
                </div>
                <div id="priceRange">
                    {[...Array(busi.price_rating)].map(() => {
                        return (
                            <span className='one-bus-dollar'><i className="fa fa-solid fa-dollar-sign"></i></span>
                        )

                    }
                    )}
                </div>
            </header>
            <div>
                <img src={busi.photo_url} alt="Business's Image" id="photo-banner" />
            </div>

            <div id='belowImg'>
                <div id='bus-info'>
                    <div id='bus-addr'>
                        Located at:
                        <div className='box-info-add' >
                        <div className='box-info' id='bus-street'>
                            {busi.street_add}
                        </div>
                        <div className='box-info' id='bus-local'>
                            {busi.city}, {busi.state} {busi.zip}
                        </div>
                        </div>
                    </div>
                    <div id='bus-contact'>
                        Contact Us:
                        <div className='box-info' id='bus-web'><i class="fa fa-solid fa-link fa-sm"></i>   {busi.website_url}</div>
                        <div className='box-info' id='bus-phone'><i class="fa fa-solid fa-phone fa-flip-horizontal fa-sm"></i>   {busi.phone_num}</div>
                    </div>
                </div>
                <div className='bus-descr-wrapper'>
                    <div id='bus-descr'>
                        About Us:
                        <div id='actual-descr'>{busi.description}</div>
                    </div>
                    </div>
                <div id='review-wrapper'>
                    <BusinessReviews business={busi}></BusinessReviews>
                </div>
            </div>
        </div>
    )
}
