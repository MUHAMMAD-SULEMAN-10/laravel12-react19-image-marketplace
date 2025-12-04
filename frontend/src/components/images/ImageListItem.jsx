import React from 'react'
import { NavLink } from 'react-router'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../../redux/slices/wishListSlice'

export default function ImageListItem({image}) {
    const { imagesList } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()

    const calculateImageReviewsAvg = () => {
        let average = image?.reviews?.reduce((acc, review) => acc += review.rating / image?.reviews?.length, 0)
        return average > 0 ? average.toFixed(1) : 0
    }

    const imageAlreadyInWishList = (image) => {
        return imagesList.find(item => item.id === image.id)
    }

    return (
        <div className="masonry-item" key={image.id}>
            <div className="card border-0 shadow-sm overflow-hidden position-relative">
                <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="card-img-top rounded"
                />
                <button className={`
                    btn btn-light btn-sm heart-btn position-absolute top-0 end-0 m-2
                    ${imageAlreadyInWishList(image) ? 'bg-danger text-white' : ''}    
                `}
                    onClick={() => dispatch(addToWishlist(image))}
                >
                    <i className="bi bi-heart"></i>
                </button>
                <div className="card-img-overlay d-flex flex-column justify-content-end p-2 overlay">
                    <span className="badge bg-secondary mb-2 text-white">
                        { image.category.name }
                    </span>
                    <h6 className="text-white fw-bold mb-1">
                        { image.title }
                    </h6>
                    <span>
                        {
                            calculateImageReviewsAvg() > 0 && 
                                <Rating
                                    initialValue={calculateImageReviewsAvg()}
                                    size={24}
                                    readonly
                                />
                        }
                    </span>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-white fw-bold">
                            ${ image.price }
                        </span>
                        <NavLink to={`/image/${image.slug}`} className="btn btn-sm btn-light">
                            View
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
