import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, getConfig } from '../../config/api'
import { logout, setCredentials } from '../../redux/slices/userSlice'
import { NavLink } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setCartItems } from '../../redux/slices/cartSlice'

export default function Navbar() {
    const {user, token, isLoggedIn } = useSelector(state => state.user)
    const { imagesList } = useSelector(state => state.wishlist)
    const { cartItems } = useSelector(state => state.cart)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user`, getConfig(token))
                filterUserCartItems(response.data.user)
                dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
            } catch (error) {
                if(error?.response?.status === 401) {
                    dispatch(logout())
                }else {
                    toast.error('Something went wrong please try again later.')
                    console.log(error)
                }
            }
        }

        if(token) getLoggedInUser()
    }, [token])

    const logoutUser = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/logout`, {}, getConfig(token))
            dispatch(logout())
            toast.success(response.data.message)
        } catch (error) {
            toast.error('Something went wrong please try again later.')
            console.log(error)
        }
    }

    const filterUserCartItems = (user) => {
        const ownedImages = user.images
        const purchasedImages = user.purchases
        const ownedImagesIds = ownedImages.map(img => img.id)
        const purchasedImagesIds = purchasedImages.map(purchase => purchase.image.id)
        const filteredCartItems = cartItems.filter(item => !(ownedImagesIds.includes(item.image_id) || purchasedImagesIds.includes(item.image_id)))
        if(filteredCartItems.length !== cartItems.length) {
            dispatch(setCartItems(filteredCartItems))
            toast.info('Cart updated we have removed your own or purchased images.')
        }
    }

    const getUserCurrentRole = () => {
        return user?.role === 'buyer' ? 'seller' : 'buyer'
    }

    const handleRoleSwitch = async () => {
        const newRole = getUserCurrentRole()
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/switch/role`, 
                {
                    role: newRole
                }
            , getConfig(token))
            dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
            toast.success(response.data.message)
        } catch (error) {
            toast.error('Something went wrong please try again later.')
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            {
                isLoggedIn ? 
                    <ul className="nav nav-underline mt-4 justify-content-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">
                                <i className="bi bi-house-door-fill"></i> Home
                            </NavLink>
                        </li>
                        {
                            user?.role === 'seller' && <li className="nav-item">
                                <NavLink className="nav-link" to="/upload">
                                    <i className="bi bi-upload"></i> Upload
                                </NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                <i className="bi bi-person"></i> { user?.name }
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={() => logoutUser()}
                            >
                                <i className="bi bi-person-fill-down"></i> Logout
                            </button>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-disabled="true" to="/cart">
                                <i className="bi bi-bag-check"></i> Cart ({cartItems.length})
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-disabled="true" to="/wishlist">
                                <i className="bi bi-heart"></i> Wishlist ({imagesList.length})
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <div className="form-check form-switch mt-2">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    role="switch" 
                                    id="switchCheckDefault" 
                                    checked={user?.role === 'seller'}  
                                    onChange={() => handleRoleSwitch()}  
                                    disabled={loading}
                                />
                                <label className="form-check-label" htmlFor="switchCheckDefault">
                                    Switch to {getUserCurrentRole()}
                                </label>
                            </div>
                        </li>
                    </ul>
                :
                <ul className="nav nav-underline mt-4 justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">
                            <i className="bi bi-house-door-fill"></i> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/register">
                            <i className="bi bi-person-add"></i> Register
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/login">
                            <i className="bi bi-person-fill-up"></i> Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-disabled="true" to="/cart">
                            <i className="bi bi-bag-check"></i> Cart ({cartItems.length})
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-disabled="true" to="/wishlist">
                            <i className="bi bi-heart"></i> Wishlist ({imagesList.length})
                        </NavLink>
                    </li>
                </ul>
            }
        </>
    )
}
