import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, getConfig } from '../../../config/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setCredentials } from '../../../redux/slices/userSlice'
import Spinner from '../../../components/layouts/Spinner'

export default function Images() {
    const { user, token } = useSelector(state => state.user)
    const [editing, setEditing] = useState({
        id: null,
        field: "",
        value: ""
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleEdit = (image, field) => {
        setEditing({id: image.id, field, value: image[field]})
    }

    const updateImage = async (image) => {
        setLoading(true)
        try {
            const response = await axios.put(`${API_BASE_URL}/images/${image.slug}/update`, 
                {
                    [editing.field]: editing.value
                },
                getConfig(token)
            )
            if(response.data.error) {
                toast.error(response.data.error)
            }else {
                dispatch(setCredentials({user: response.data.user, token: response.data.access_token}))
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error('Error while updating the image try again later.')
            console.log(error)
        }finally{
            setEditing({
                id: null,
                field: "",
                value: ""
            })
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
                    Images
                </h5>
            </div>
            <div className="card-body">
                {
                    user?.images?.length > 0 ? 
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-bordered"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user?.images?.map(image => (
                                            <tr key={image.id}>
                                                <td scope="row">
                                                    <img 
                                                        src={image.image_url} 
                                                        alt={image.title} 
                                                        width={80}
                                                        height={80}
                                                        className="img-fluid rounded"
                                                    />
                                                </td>
                                                <td>
                                                    {
                                                        editing.id === image.id && editing.field === "title" ? (
                                                            <input 
                                                                type="text" 
                                                                name="title" 
                                                                id="title"
                                                                className="form-control"
                                                                value={editing.value} 
                                                                onChange={(e) => setEditing({...editing, value: e.target.value})}
                                                            />
                                                        )
                                                        :
                                                        <span onClick={() => handleEdit(image, "title")}>
                                                            { image.title }
                                                        </span>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        editing.id === image.id && editing.field === "price" ? (
                                                            <input 
                                                                type="number" 
                                                                name="price" 
                                                                id="price"
                                                                className="form-control"
                                                                value={editing.value} 
                                                                onChange={(e) => setEditing({...editing, value: e.target.value})}
                                                            />
                                                        )
                                                        :
                                                        <span onClick={() => handleEdit(image, "price")}>
                                                            { image.price }
                                                        </span>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        image.status === 'approved' ?
                                                            <span className="badge bg-success">
                                                                { image.status }
                                                            </span>
                                                        :
                                                        image.status === 'rejected' ?
                                                            <span className="badge bg-danger">
                                                                { image.status }
                                                            </span>
                                                        :
                                                            <span className="badge bg-primary">
                                                                { image.status }
                                                            </span>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        editing.id === image.id && editing.field && editing.value && (
                                                            <button className="btn btn-warning btn-sm"
                                                                onClick={() => updateImage(image)}
                                                            >
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    :
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="alert alert-info">
                                No images yet!
                            </div>
                        </div>
                    </div>    
                }
            </div>
        </div>
    )
}
