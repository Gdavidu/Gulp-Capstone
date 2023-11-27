import './BusinessSearch.css'
import { getSearchedBusisThunk } from '../../store/business'
import BusinessCard from '../BusinessCard'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function BusinessSearch(){
    const dispatch = useDispatch();
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searched = query.get('')

    const busis = useSelector(state=>Object.values(state.businesses.allBusinesses))

    useEffect(()=>{
        dispatch(getSearchedBusisThunk(searched))
    },[dispatch,searched])

    document.getElementById('logo').style.color = '#FF1A1A'
    document.querySelector('.fa-yelp').style.color = '#FF1A1A'
    return(<>
        <div className='nav-border'></div>
        <h1 className='search-keyword'>Results for "{searched}"</h1>
        <div className='search-results'>
            {busis.length > 0 ? (
            busis.map((busi) => <BusinessCard key={busi.id} business={busi} />
          )) : (
            <>
                <div className="not-found">
                    <h1>No Results for "{searched}"</h1>
                    <div className="no-busis">
                        <h2>Suggestions for improving your search:</h2>

                            <p>Search for a business name or its owner name (search is not case-sensitive)</p>
                            <p>Check the spelling, or try alternate spellings.</p>
                    </div>
                </div>
            </>
          )}
        </div>
        </>
    )
}
