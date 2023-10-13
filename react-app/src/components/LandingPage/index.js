import './LandingPage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getBusisThunk } from '../../store/business';
import BusinessCard from '../BusinessCard';
export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const busisObj = useSelector(state => state.businesses.allBusinesses);
    const busis = Object.values(busisObj)
    useEffect(() => {
        dispatch(getBusisThunk())
    }, [dispatch])


    if (!busis.length) return null
    const busiArr = []
    for (let i = 0; i < 9; i++) {
        if(busis[i]) busiArr.push(busis[i])
    }
    // console.log("BUSI ARR", busiArr)
    return (
        <div className='recent-contain'>
            <h1 id='recent-title'>Recent Activity:</h1>
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
