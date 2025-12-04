import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API_BASE_URL } from '../../config/api'
import axios from 'axios'
import useValidation from '../../components/custom/useValidation'
import Spinner from '../../components/layouts/Spinner'
import { toast } from 'react-toastify'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

export default function Register() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    }, [isLoggedIn])

    const registerNewUser = async (e) => {
        e.preventDefault()
        setValidationErrors(null)
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/user/register`, user)
            toast.success(response.data.message)
            navigate('/login')
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
                            Register 
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => registerNewUser(e)}>
                            <div className="my-3">
                                <label htmlFor="name" className="form-label">
                                    Name*
                                </label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="form-control"
                                    placeholder="Name*"
                                    value={user.name}
                                    onChange={(e) => setUser((prev) => ({...prev, name: e.target.value}))}
                                />
                                { useValidation(validationErrors, 'name') }
                            </div>
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
                            You already have an account log in from
                        </span>
                        <Link to="/login" className="text-danger fw-bold">
                            here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
