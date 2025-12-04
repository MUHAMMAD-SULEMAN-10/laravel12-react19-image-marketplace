import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../redux/slices/cartSlice'
import { Link } from 'react-router'
import axios from "axios"
import { API_BASE_URL, getConfig } from '../../config/api'
import { toast } from 'react-toastify'
import Spinner from '../../components/layouts/Spinner'

export default function Cart() {
    const { token, isLoggedIn } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const total = cartItems.reduce((acc, item) => acc += item.price * item.qty, 0)

    const checkout = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/pay/order`, 
                {
                    cartItems
                },
                getConfig(token)
            )
            window.location.href = response.data.url
        } catch (error) {
            toast.error('Something went wrong please try again later.')
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    if(loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="row my-4">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {
                            cartItems.length > 0 ? 
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
                                                    <th scope="col">Qty</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Subtotal</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItems.map((item, index) => (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                {index += 1}
                                                            </td>
                                                            <td>
                                                                <img 
                                                                    src={item.file_path} 
                                                                    alt={item.title} 
                                                                    className="img-fluid rounded"
                                                                    height={60}
                                                                    width={60}
                                                                />
                                                            </td>
                                                            <td>
                                                                { item.title }
                                                            </td>
                                                            <td>
                                                                { item.qty }
                                                            </td>
                                                            <td>
                                                                ${ item.price }
                                                            </td>
                                                            <td>
                                                                ${ item.price * item.qty }
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-sm btn-danger"
                                                                    onClick={() => dispatch(removeFromCart(item))}
                                                                >
                                                                    <i className="bi bi-cart-x"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-end">
                                            <div className="border border-dark border-3 fw-bold p-2 rounded">
                                                Total: <span className="text-danger">${total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <div className="alert alert-info">
                                        Your cart is empty!
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 && <div className="my-3 d-flex justify-content-end border-top">
                            <div className="mt-2">
                                <Link to="/" className="btn btn-dark">
                                    Continue Shopping
                                </Link>
                                {
                                    isLoggedIn ?
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => checkout()}
                                        >
                                            Checkout 
                                        </button>
                                    :
                                        <Link to="/login" className="btn btn-danger mx-1">
                                            Checkout
                                        </Link>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
