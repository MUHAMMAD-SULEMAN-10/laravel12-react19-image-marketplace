import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL } from '../../config/api'
import axios from 'axios'
import useValidation from '../../components/custom/useValidation'
import Spinner from '../../components/layouts/Spinner'
import { toast } from 'react-toastify'
import { Link } from 'react-router'
import { setCredentials } from '../../redux/slices/userSlice'

export default function Register() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    }, [isLoggedIn])

    const loginUser = async (e) => {
        e.preventDefault()
        setValidationErrors(null)
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, user)
            dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }else {
                toast.error('Something went wrong please try again later.')
                console.log(error)
            }
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="row my-4">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header text-center bg-white">
                        <h3 className="mt-2">
                            Login 
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => loginUser(e)}>
                            <div className="my-3">
                                <label htmlFor="email" className="form-label">
                                    Email*
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="form-control"
                                    placeholder="Email*"
                                    value={user.email}
                                    onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))}
                                />
                                { useValidation(validationErrors, 'email') }
                            </div>
                            <div className="my-3">
                                <label htmlFor="password" className="form-label">
                                    Password*
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-control"
                                    placeholder="Password*"
                                    value={user.password}
                                    onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
                                />
                                { useValidation(validationErrors, 'password') }
                            </div>
                            {
                                loading ?
                                    <Spinner />
                                :
                                    <button type="submit" className="btn btn-dark btn-sm">
                                        Submit
                                    </button>
                            }
                        </form>
                    </div>
                    <div className="card-footer text-center bg-white">
                        <span className="fw-bold me-1">
                            New user create your account from
                        </span>
                        <Link to="/register" className="text-danger fw-bold">
                            here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
