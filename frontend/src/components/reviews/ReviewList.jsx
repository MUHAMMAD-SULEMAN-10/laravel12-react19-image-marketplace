import React from 'react'
import { useSelector } from 'react-redux'
import ReviewListItem from './ReviewListItem'

export default function ReviewList() {
    const { reviews } = useSelector(state => state.review)

    return (
        <div className="row my-2">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header bg-white text-center">
                        <h5 className="mt-2">
                            Reviews ({reviews?.length})
                        </h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group my-3">
                            {
                                reviews?.length > 0 ? 
                                    reviews?.map(item => <ReviewListItem 
                                        review={item}
                                        key={item.id}
                                    />)
                                :
                                <div className="alert alert-info">
                                    No reviews yet!
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
