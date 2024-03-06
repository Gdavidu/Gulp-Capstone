import "./BusinessCard.css";
import { NavLink } from 'react-router-dom';
// TEST AGAIN 3

export default function BusinessCard({ business }) {
    return (
        <div className="busi-card">
            <div className='reviewer-details'>Reviewer Pic & Name</div>
            <NavLink className="busi-card-pic-link" exact to={`/businesses/${business.id}`}>
                <img src={business.photo_url} alt="Business's picture did not load"></img>
            </NavLink>
            <NavLink className="busi-card-details-link" exact to={`/businesses/${business.id}`}>
                <p className="busi-name">{business.name}</p>
            </NavLink>
        </div>
    )
}
