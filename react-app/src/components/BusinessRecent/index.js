import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import './BusinessRecent.css'
import { NavLink } from 'react-router-dom';


export default function BusinessRecent() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busiArr = Object.values(busisObj).reverse()
    useEffect(() => {
        dispatch(getBusisThunk())
    }, [dispatch])
    // console.log('SESSIONUSER', sessionUser)
    // console.log('USERBUSINESSES BUSIS', busis)


    document.getElementById('logo').style.color = '#FF1A1A'
    document.querySelector('.fa-yelp').style.color = '#FF1A1A'
    // console.log("BUSI ARR", busiArr)
    return (
        <>
        <div className='busrecent-contain'>
                    <h1 id='recent-title'>Explore Our Newest Businesses:</h1>
                    </div>
        <div className='recent-container'>

            <div className='flex-contain'>
                <div className="recent-squares">
                    {busiArr.length && busiArr.map(bus => (
                        <>
                            <div className="busi-card">
                                {/* <div className='reviewer-details'>Reviewer Pic & Name</div> */}
                                <NavLink className="busi-card-details-link" exact to={`/businesses/${bus.id}`}>
                                    <p className="busi-name">{bus.name}</p>
                                </NavLink>
                                <NavLink className="busi-card-pic-link" exact to={`/businesses/${bus.id}`}>
                                    <img src={bus.photo_url} alt="Business's picture did not load"></img>
                                </NavLink>
                                <div className="bus-pricing">
                                   <div>Price Range:</div>
                                {[...Array(bus.price_rating)].map(() => {
                        return (
                            <span id='bus-detail-price' className='dollar'><i className="fa fa-solid fa-dollar-sign"></i></span>

                        )

                    }
                    )}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
