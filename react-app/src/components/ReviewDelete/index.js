import './ReviewDelete.css'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/review";


export default function ReviewDelete({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to delete your review?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Review)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Review)</button>
        </div>
    )
    }
