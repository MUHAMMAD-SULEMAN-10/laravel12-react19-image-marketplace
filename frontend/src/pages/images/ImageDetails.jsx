import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Spinner from '../../components/layouts/Spinner'
import { API_BASE_URL, getConfig } from '../../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import AddUpdateReview from '../../components/reviews/AddUpdateReview'
import { setReviews } from '../../redux/slices/reviewSlice'
import ReviewList from '../../components/reviews/ReviewList'
import { Rating } from 'react-simple-star-rating'
import { addToWishlist } from '../../redux/slices/wishListSlice'

export default function ImageDetails() {
    const { user, token, isLoggedIn } = useSelector(state => state.user)
    const { imagesList } = useSelector(state => state.wishlist)
    const { reviews } = useSelector(state => state.review)
    const[image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { slug } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const getImageBySlug = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/images/${slug}`)
                setImage(response.data.data)
                dispatch(setReviews(response.data.data.reviews))
            } catch (error) {
                if(error?.response?.status === 404) {
                    setError('Image not found.')
                }else {
                    setError('Error while fetching the image refresh the page again.')
                    console.log(error)
                }
            }finally {
                setLoading(false)
            }
        } 
        getImageBySlug()
    }, [])

    const checkIfUserBoughtImage = () => {
        return user?.purchases?.some(purchase => purchase.image.id === image?.id)
    }

    const renderCartButtons = () => {
        if(checkIfUserBoughtImage()) {
            return (
                <button className="btn btn-secondary w-100"
                    onClick={() => downloadImage()}
                >
                    <i className="bi bi-download me-2"></i> Download
                </button>
            )
        }else {
            return (
                <button className="btn btn-primary w-100"
                    onClick={() => dispatch(addToCart({
                        image_id: image?.id,
                        seller_id: image?.seller?.id,
                        title: image?.title,
                        file_path: image?.image_url,
                        price: image?.price,
                        qty: 1
                    }))}
                    disabled={ image?.seller?.id === user?.id || user?.role === "seller" }
                >
                    <i className="bi bi-cart me-2"></i> Add to cart
                </button>
            )
        }
    }

    const downloadImage = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/images/${image.slug}/download`, 
                {
                    responseType: 'blob',
                    ...getConfig(token, `image/${image.extension}`)
                }
            )
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url 
            link.setAttribute('download', `${image.title}.${image.extension}`)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            if(error?.response?.status === 404) {
                setError('Image not found.')
            }else {
                setError('Error while downloading the image try again later.')
                console.log(error)
            }
        }
    }

    const calculateImageReviewsAvg = () => {
        let average = reviews?.reduce((acc, review) => acc += review.rating / reviews?.length, 0)
        return average > 0 ? average.toFixed(1) : 0
    }

    const imageAlreadyInWishList = (image) => {
        return imagesList.find(item => item.id === image.id)
    }

    if(loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner />
            </div>
        )
    }

    if(error) {
        return (
            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    <div className="alert alert-danger">
                        { error }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="row my-4">
            <div className="col-md-8 mb-2">
                <div className="card card-border-0 shadow-sm p-3">
                    <div className="image-container position-relative">
                        <img 
                            src={image?.image_url} 
                            alt={image?.title} 
                            className="img-fluid rounded"
                        />
                        <button className={`
                            btn btn-light btn-sm heart-btn position-absolute top-0 end-0 m-2
                            ${imageAlreadyInWishList(image) ? 'bg-danger text-white' : ''}    
                        `}
                            onClick={() => dispatch(addToWishlist(image))}
                        >
                            <i className="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm p-3">
                    <h4 className="fw-bold mb-2">
                        {image?.title}
                    </h4>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                        <span className="d-flex align-items-center">
                            {
                                calculateImageReviewsAvg() > 0 && 
                                    <>
                                        <Rating
                                            initialValue={calculateImageReviewsAvg()}
                                            size={24}
                                            readonly
                                        />
                                        <i className="fw-bold ms-2">
                                            {
                                                calculateImageReviewsAvg()    
                                            }
                                        </i>
                                    </>
                            }
                        </span>
                        {
                            reviews?.length > 0 &&
                                <span className="fw-bold">
                                    <i>
                                        {
                                            reviews?.length
                                        }
                                        {" "}
                                        {
                                            reviews?.length > 1 ? 'Reviews' : 'Review' 
                                        }
                                    </i>
                                </span>
                        }
                    </div>
                    <span className="badge bg-secondary mb-2 text-white">
                        { image?.category?.name }
                    </span>
                    <p className="text-muted mb-3">
                        { image?.description }
                    </p>
                    <span className="fw-bold">
                        Upload date: <i>{ image?.created_at }</i>
                    </span>
                    <h5 className="fw-bold mt-3 text-danger">
                        ${ image?.price }
                    </h5>
                    <p className="my-2">
                        <span className="fw-bold">
                            {image?.width}
                        </span>
                        <span className="mx-1">
                            x
                        </span>
                        <span className="fw-bold me-1">
                            {image?.height}
                        </span>
                        pixels <i className="bi bi-dot"></i> {image?.extension?.toUpperCase()}
                    </p>
                    { renderCartButtons() }
                    <div className="mt-4 border-top pt-3">
                        <p className="small-text-muted mb-1">Photographer</p>
                        <div className="fw-semibold d-flex justify-content-between">
                            <p className="d-flex justify-content-start gap-2">
                                <span>
                                    <i className="bi bi-person"></i> {image?.seller?.name}
                                </span>
                                <span>
                                    <i className="bi bi-image"></i> {image?.seller?.image_count}
                                </span>
                            </p>
                            <span>
                                <i className="bi bi-download"></i> {image?.downloads}
                            </span>
                        </div>
                    </div>
                </div>
                <ReviewList />
                {
                    isLoggedIn && checkIfUserBoughtImage() && <AddUpdateReview image={image} />
                }
            </div>
        </div>
    )
}
