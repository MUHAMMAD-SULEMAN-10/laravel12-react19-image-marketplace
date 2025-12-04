import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItems } from '../../redux/slices/cartSlice'
import { setCredentials } from '../../redux/slices/userSlice'
import { API_BASE_URL, getConfig } from '../../config/api'
import axios from 'axios'

export default function Success() {
    const { token } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const location = useLocation()
    const [status, setStatus] = useState('processing')
    const [message, setMessage] = useState('Processing...')
    const dispatch = useDispatch()
    const alertType = status === 'error' ? 'danger' : status === 'success' ? 'success' : 'info'

    useEffect(() => {
        const processPayment = async () => {
            const params = new URLSearchParams(location.search)
            const sessionId = params.get('session_id')
            try {
                const response = await axios.post(`${API_BASE_URL}/pay/check`, 
                    {
                        session_id: sessionId,
                        cartItems
                    },
                    getConfig(token)
                )

                if(response.data.error) {
                    setStatus('error')
                    setMessage(response.data.error)
                }else {
                    dispatch(clearCartItems())
                    dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
                    setStatus('success')
                    setMessage(response.data.message)
                }
            } catch (error) {
                setStatus('error')
                setMessage('Error while verifying the payment try again later.')
                console.log(error)
            }
        }

        processPayment()
    }, [])

    return (
        <div className="row mt-5">
            <div className="col-md-6 mx-auto">
                <div className={`alert alert-${alertType}`}>
                    { message }
                </div>
            </div>
        </div>
    )
}
