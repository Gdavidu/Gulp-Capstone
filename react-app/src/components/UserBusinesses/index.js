import './UserBusinesses.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import BusinessCard from '../BusinessCard';
export default function UserBusinesses() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busis = Object.values(busisObj)
    useEffect(() => {
        dispatch(getBusisThunk())
    }, [dispatch])
    console.log('SESSIONUSER',sessionUser)
    console.log('USERBUSINESSES BUSIS', busis)

    if(!sessionUser) return(
        <div>You must log in to see your businesses!</div>
    )
    if (!busis.length) return (
        <div>You currently have no businesses on our site</div>
    )
    const busiArr = []
    for (let i = 0; i < (busis.length-1); i++) {
        // console.log(busis[i].owner_id)
        if(busis[i].owner_id===sessionUser.id){
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
                    <BusinessCard key={bus.id} business={bus} />
                    </>
                ))}
            </div>
            </div>
        </div>
    )
}
