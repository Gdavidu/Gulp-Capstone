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
    const reviews = useSelector(state =>Object.values(state.reviews.business))
    useEffect(() => {
        dispatch(getBusiThunk(busiId))
    }, [dispatch])

    let ratingSum=0;
    for (let i=0; i<reviews.length; i++){
        ratingSum+=reviews[i].rating
    }
    const ratingTotal= Math.floor(ratingSum/reviews.length)

    if (!busi) return null
    if (!busi.id) return null
    // console.log(ratingTotal)
    document.getElementById('logo').style.color = '#FF1A1A'
    document.querySelector('.fa-yelp').style.color = '#FF1A1A'
    return (

        <div className="detail-page">
            <header id="header-wrap">
                <h1 id="bus-name">{busi.name}</h1>
                <div id="stars">
                {reviews.length?[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                        <span key={index} className={index <= ratingTotal ? "on" : "off"}>
                                            <i class="fa fa-regular fa-star"></i>
                                        </span>
                                );
                            }):<div>No reviews yet</div>}
                </div>
                <div id="priceRange">
                    {[...Array(busi.price_rating)].map(() => {
                        return (
                            <span id='bus-detail-price' className='dollar'><i className="fa fa-solid fa-dollar-sign"></i></span>
                        )

                    }
                    )}
                </div>
            </header>
            <div>
                <img src={busi.photo_url} alt="Business's Image" id="photo-banner" />
            </div>
            <div id='bus-info'>
                <div id='bus-addr'>
                    Located at:
                    <div id='bus-street'>
                    {busi.street_add}
                    </div>
                    <div id='bus-local'>
                    {busi.city}, {busi.state} {busi.zip}
                    </div>
                </div>
                <div id='bus-contact'>
                    Contact Us:
                    <div id='bus-web'>{busi.website_url}</div>
                    <div id='bus-phone'>{busi.phone_num}</div>
                </div>
            </div>
            <div id='bus-descr'>
                    About Us:
                    <div>{busi.description}</div>
            </div>
            <div id='review-wrapper'>
                    <BusinessReviews business={busi}></BusinessReviews>
            </div>
        </div>
    )
}
