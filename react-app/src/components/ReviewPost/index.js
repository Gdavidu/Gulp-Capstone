import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ReviewPost.css'
import { createReviewThunk } from "../../store/review";

export default function ReviewPost({businessId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
}
