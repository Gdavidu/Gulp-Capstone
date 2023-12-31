import "./RecentActivity.css";
import { NavLink } from 'react-router-dom';


export default function RecentActivity({ key, review }) {
    function concat(str) {

        if (str){
            let reviewConcat = str.substring(0,35)
            // console.log(reviewConcat[reviewConcat.length-1])
            if (reviewConcat[reviewConcat.length-1] === ' ') reviewConcat = reviewConcat.substring(0,reviewConcat.length-1)
            if (reviewConcat.length>=34) reviewConcat += '..'
            // console.log(reviewConcat)
            return reviewConcat
        }
    }

    return (
        <>
        <div key={key} className="busi-card" >
            <NavLink className="busi-card-details-link" exact to={`/businesses/${review.business.id}`}>
                <p className="busi-name">{review.business.name}</p>
            </NavLink>
            <NavLink className="busi-card-pic-link" exact to={`/businesses/${review.business.id}`}>
                <img src={review.business.photo_url} alt="Business's picture did not load"></img>
            </NavLink>
            <div className='reviewer-details'>{review.user.firstname} {review.user.lastname[0].toUpperCase()}. has left a review: </div>
            <div className="reviewtext">"{concat(review.review)}"</div>
            <div className="review-rating">{[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span key={index} className={index <= review.rating ? "on" : "off"}>
                        <i class="fa fa-regular fa-star"></i>
                    </span>
                );
            })}
            </div>
        </div>

        </>
    )
}
