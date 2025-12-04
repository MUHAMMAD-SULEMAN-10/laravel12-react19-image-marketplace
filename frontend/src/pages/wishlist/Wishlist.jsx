import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../../redux/slices/wishListSlice'
import { NavLink } from 'react-router'


export default function Cart() {
    const { imagesList } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()

    return (
        <div className="row my-4">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {
                            imagesList.length > 0 ? 
                                <div>
                                    <div
                                        className="table-responsive"
                                    >
                                        <table
                                            className="table table-bordered"
                                        >
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    imagesList.map((item, index) => (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                {index += 1}
                                                            </td>
                                                            <td>
                                                                <img 
                                                                    src={item.image_url} 
                                                                    alt={item.title} 
                                                                    className="img-fluid rounded"
                                                                    height={60}
                                                                    width={60}
                                                                />
                                                            </td>
                                                            <td>
                                                                <NavLink to={`/image/${item.slug}`} className="btn btn-sm btn-link text-dark">
                                                                    { item.title }
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                ${ item.price }
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-sm btn-danger"
                                                                    onClick={() => dispatch(addToWishlist(item))}
                                                                >
                                                                    <i className="bi bi-x"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            :
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <div className="alert alert-info">
                                        Your wishlist is empty!
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
