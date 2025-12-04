import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { API_BASE_URL, getConfig } from '../../config/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import { clearSelectedReview, removeReview } from '../../redux/slices/reviewSlice'

export default function AddUpdateReview({image}) {
    const { user, token } = useSelector(state => state.user)
    const { selectedReview } = useSelector(state => state.review)
    const [review, setReview] = useState({
        image_id: image?.id,
        user_id: user?.id,
        title: '',
        body: '',
        rating: 0
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(selectedReview) {
            setReview({
                image_id: selectedReview.image.id,
                user_id: selectedReview.user.id,
                title: selectedReview.title,
                body: selectedReview.body,
                rating: selectedReview.rating
            })
        }else {
            clearReviewData()
        }
    }, [selectedReview])

    const handleRating = (rating) => {
        setReview((prev) => ({...prev, rating}))
    }

    const addReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/review/store`, review, getConfig(token))
            if(response.data.error) {
                toast.error(response.data.error)
            }else {
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error('Error while adding the review try again later.')
            console.log(error)
        }finally {
            setLoading(false)
            clearReviewData()
        }
    }

    const updateReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.put(`${API_BASE_URL}/review/update`, review, getConfig(token))
            if(response.data.error) {
                toast.error(response.data.error)
            }else {
                dispatch(removeReview(selectedReview.id))
                dispatch(clearSelectedReview())
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error('Error while updating the review try again later.')
            console.log(error)
        }finally {
            setLoading(false)
            clearReviewData()
        }
    }

    const clearReviewData = () => {
        setReview({
            image_id: image?.id,
            user_id: user?.id,
            title: '',
            body: '',
            rating: 0
        })
    }

    return (
         <div className="row my-4">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header text-center bg-white">
                        <h3 className="mt-2">
                            { selectedReview ? 'Edit' : 'Add'} Review
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => selectedReview ? updateReview(e) : addReview(e)}>
                            <div className="my-3">
                                <label htmlFor="title" className="form-label">
                                    Title*
                                </label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    className="form-control"
                                    placeholder="Title*"
                                    value={review.title}
                                    onChange={(e) => setReview((prev) => ({...prev, title: e.target.value}))}
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="body" className="form-label">
                                    Content*
                                </label>
                                <textarea 
                                    rows="5" 
                                    name="body" 
                                    id="body" 
                                    className="form-control"
                                    placeholder="body"
                                    value={review.body}
                                    onChange={(e) => setReview((prev) => ({...prev, body: e.target.value}))}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <Rating 
                                    initialValue={review.rating}
                                    size={32}
                                    onClick={handleRating}
                                />
                            </div>
                            <button type="submit" 
                                className={`btn btn-${selectedReview ? 'warning' : 'dark'} btn-sm`}
                                disabled={!review.title || !review.body || review.rating === 0 || loading}    
                            >
                                Submit
                            </button>
                            {
                                selectedReview && 
                                    <button 
                                        className="btn btn-danger btn-sm mx-2"
                                        disabled={loading}
                                        onClick={() => dispatch(clearSelectedReview())}
                                    >
                                            Cancel
                                    </button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
