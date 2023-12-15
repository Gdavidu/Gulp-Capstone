import './OneBusiness.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiThunk } from "../../store/business";
import BusinessReviews from '../BusinessReviews';
import { Loader } from "@googlemaps/js-api-loader"

// import { Loader } from '@googlemaps/js-api-loader';
// import {
//     APIProvider,
//     Map,
//     Marker
// }
// from "@vis.gl/react-google-maps";

// "use client";
export default function OneBusiness() {
    // const dotenv = require("dotenv")
    // dotenv.config()
    const mapApi = process.env.REACT_APP_GOOGLEMAPSAPI_KEY
    const { busiId } = useParams();
    const dispatch = useDispatch();
    const busi = useSelector(state => state.businesses.singleBusiness);
    // const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews.business))
    const [coordinates, setCoordinates] = useState({})
//     console.log('API KEY', mapApi)
// console.log('Env keys', process.env.REACT_APP_BASE_URL)
// console.log('test', process.env.REACT_APP_TEST)
    // const loader =  new Loader({
    //     apiKey: mapApi,
    //     version: "weekly",
    //     libraries: ["places"]
    //   });
    //   const mapOptions = {
    //     center: {
    //       lat: 0,
    //       lng: 0
    //     },
    //     zoom: 4
    //   };

    useEffect(() => {
        dispatch(getBusiThunk(busiId))
    }, [dispatch])

    let ratingSum = 0;
    for (let i = 0; i < reviews.length; i++) {
        ratingSum += reviews[i].rating
    }
    const ratingTotal = Math.floor(ratingSum / reviews.length)
    // console.log('PLAIN ADDRESS', plainAddr)
    // console.log('ENCODED ADDRESS', escapedAddr)
    const plainAddr = `${busi.street_add} ${busi.city} ${busi.state}`
    const escapedAddr = encodeURIComponent(plainAddr)
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${escapedAddr}&key=${mapApi}`
    useEffect(() => {
        fetch(geocodingUrl).then(result => result.json())
          .then(data =>{
            if(!data || data.status === 'ZERO_RESULTS'){
                throw new Error('Could not locate address')
            }
              setCoordinates(data.results[0].geometry.location)
          }
        )
        .catch(error=>{
            console.log('Error: ', error)
        });
    }, [geocodingUrl,escapedAddr,plainAddr])

    if (!busi) return null
    if (!busi.id) return null

    // manual change of the 'Gulp' logo color
    document.getElementById('logo').style.color = '#FF1A1A'
    document.querySelector('.fa-yelp').style.color = '#FF1A1A'

    // form a readable address for geocoding

    // const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myAPIKey}`;
    console.log('COORDINATES STATE VAR', coordinates)

        const loader = new Loader({
            apiKey: mapApi,
            version: "weekly",
          });

          const mapOptions = {
            center: coordinates,
            zoom: 16
          };

        loader
        .importLibrary('maps')
        .then(({Map}) => {
        new Map(document.getElementById("map"), mapOptions);
      })
      .catch((e) => {
        const map = document.getElementById("map")
        console.log('map div', map)
        map.innerText = "Map could not be loaded ):"
      });
    
    return (
        <>
        {/* <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
            <div id='map'>
                <Map zoom={9} center={position}></Map>
            </div>
        </APIProvider> */}

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
                <div id='map'></div>
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
        </>
    )
}
