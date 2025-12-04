import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, getConfig } from '../../../config/api'
import { toast } from 'react-toastify'
import useValidation  from '../../../components/custom/useValidation'
import { setCredentials } from '../../../redux/slices/userSlice'
import Spinner from '../../../components/layouts/Spinner'
import axios from 'axios'

export default function Earnings() {
    const { user, token } = useSelector(state => state.user)
    const [paypalEmail, setPaypalEmail] = useState("")
    const [validationErrors, setValidationErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user?.paypal_email) {
            setPaypalEmail(user?.paypal_email)
        }
    }, [user.paypal_email])

    const withdrawEarnings = async (e) => {
        e.preventDefault()
        setValidationErrors(null)
        setLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/withdraw`, 
                {
                    paypal_email: paypalEmail
                },
                getConfig(token)
            )
            if(response.data.error) {
                toast.error(response.data.error)
            }else {
                setPaypalEmail('')
                dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
                toast.success(response.data.message)
            }
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }else {
                toast.error('Error while withdrawing the earnings try again later.')
                console.log(error)
            }
        }finally{
            setLoading(false)
        }
    }

    if(loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="card mb-3">
            <div className="card-header bg-white">
                <h5 className="mt-2">
                    Earnings
                </h5>
            </div>
            <div className="card-body">
                <div
                    className="table-responsive"
                >
                    <table
                        className="table table-bordered"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Total Earned</th>
                                <th scope="col">Total Withdrawn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">
                                    ${ user?.earnings?.total_earned || 0}
                                </td>
                                <td>
                                    ${ user?.earnings?.total_withdrawn || 0}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <form 
                        onSubmit={(e) => withdrawEarnings(e)}
                        className="col-md-6">
                        <div>
                            {
                                !user?.paypal_email && 
                                    <input 
                                        type="email" 
                                        name="paypal_email" 
                                        id="paypal_email" 
                                        className="form-control"
                                        value={paypalEmail}
                                        onChange={(e) => setPaypalEmail(e.target.value)}
                                        placeholder="Paypal Email"
                                    />
                            }
                            { useValidation(validationErrors, 'paypal_email') }
                        </div>
                        <button 
                            type="submit"
                            className="btn btn-danger btn-sm mt-2"
                            disabled={!user?.earnings || user?.earnings?.total_earned === 0}
                        >
                            <i className="bi bi-box-arrow-down"></i> Withdraw
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
