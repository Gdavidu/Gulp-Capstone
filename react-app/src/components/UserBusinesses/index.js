import './UserBusinesses.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import BusinessCard from '../BusinessCard';
import OpenModalButton from "../OpenModalButton";
import { NavLink } from 'react-router-dom';
import BusinessDelete from '../BusinessDelete';
import BusinessEdit from '../BusinessEdit';

export default function UserBusinesses() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busis = Object.values(busisObj)
    useEffect(() => {
        dispatch(getBusisThunk())
    }, [dispatch])
    // console.log('SESSIONUSER', sessionUser)
    // console.log('USERBUSINESSES BUSIS', busis)

    if (!sessionUser) {
        history.push('/')
        return null
    }
    if (!busis.length) return (
        <div>You currently have no businesses on our site</div>
    )
    const busiArr = []
    for (let i = 0; i < (busis.length); i++) {
        // console.log(busis[i].owner_id)
        if (busis[i].owner_id === sessionUser.id) {
            busiArr.push(busis[i])
        }


    }
    // console.log("BUSI ARR", busiArr)
    return (
        <div className='recent-contain'>
            <h1 id='recent-title'>{sessionUser.firstname}'s Businesses</h1>
            <div className='flex-contain'>
                <div className="recent-squares">
                    {busiArr.length && busiArr.map(bus => (
                        <>
                            <div className="busi-card">
                                <div className='reviewer-details'>Reviewer Pic & Name</div>
                                <NavLink className="busi-card-pic-link" exact to={`/businesses/${bus.id}`}>
                                    <img src={bus.photo_url} alt="Business's picture did not load"></img>
                                </NavLink>
                                <NavLink className="busi-card-details-link" exact to={`/businesses/${bus.id}`}>
                                    <p className="busi-name">{bus.name}</p>
                                </NavLink>
                                {bus.owner_id ? <OpenModalButton
                                buttonText= <i className="fa fa-solid fa-trash fa-xs"> Delete</i>
                                modalComponent={<BusinessDelete busId={bus.id}/>}
                                ></OpenModalButton>: null}
                                {bus.owner_id ? <OpenModalButton
                                buttonText= <i className="fa fa-solid fa-pen-nib fa-xs"> Edit</i>
                                modalComponent={<BusinessEdit busId={bus.id}/>}
                                ></OpenModalButton>: null}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
