import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { clearSelectedReview, removeReview, setSelectedReview } from '../../redux/slices/reviewSlice'
import { API_BASE_URL, getConfig } from '../../config/api'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ReviewListItem({review}) {
    const { user, token } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const deleteReview = async (e) => {
        if(confirm('Are you sure?')) {
            try {
                const response = await axios.post(`${API_BASE_URL}/review/delete`, 
                    {
                        image_id: review?.image?.id
                    }    
                , getConfig(token))
                if(response.data.error) {
                    toast.error(response.data.error)
                }else {
                    dispatch(removeReview(review.id))
                    dispatch(clearSelectedReview())
                    toast.success(response.data.message)
                }
            } catch (error) {
                toast.error('Error while deleting the review try again later.')
                console.log(error)
            }
        }
    }

    const renderReviewActions = () => (
        review?.user?.id === user?.id &&
            <div className="dropdown ms-auto">
                <i className="bi bi-three-dots-vertical"
                    data-bs-toggle="dropdown"
                ></i>
                <ul className="dropdown-menu">
                    <li>
                        <span className="dropdown-item"
                            style={{cursor: 'pointer'}}
                            onClick={() => dispatch(setSelectedReview(review))}
                        >
                            <i className="bi bi-pen mx-2 text-warning"></i> Update
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item"
                            style={{cursor: 'pointer'}}
                            onClick={() => deleteReview()}
                        >
                            <i className="bi bi-trash mx-2 text-danger"></i> Delete
                        </span>
                    </li>
                </ul>
            </div>
    )

    return (
        <li 
            className="list-group-item bg-light d-flex justify-content-start
            align-items-center p-2 mb-2 rounded shadow-sm"
        >
            <div className="me-2">
                <i className="bi bi-person h1"></i>
            </div>
            <div className="d-flex flex-column">
                <h6><i>{review?.title}</i></h6>
                <p className="m-0">{review?.body}</p>
                <Rating 
                    initialValue={review?.rating}
                    size={24}
                    readonly
                />
                <div>
                    <span className="fw-bold">
                         {review?.user?.name} <i className="text-danger">{review?.created_at}</i>
                    </span>
                </div>
            </div>
            {
                renderReviewActions()
            }
        </li>
    )
}
