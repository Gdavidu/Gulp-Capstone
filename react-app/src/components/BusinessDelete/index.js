import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBusiThunk } from "../../store/business";


export default function BusinessDelete({ busId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteBusiThunk(busId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to delete your business?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Business)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Business)</button>
        </div>
    )
    }
