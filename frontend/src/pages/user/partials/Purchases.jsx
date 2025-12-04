import React from 'react'
import { useSelector } from 'react-redux'
import { API_BASE_URL, getConfig } from '../../../config/api'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Purchases() {
    const { user, token } = useSelector(state => state.user)

    const downloadImage = async (image) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/images/${image.slug}/download`, 
                {
                    responseType: 'blob',
                    ...getConfig(token, `image/${image.extension}`)
                }
            )
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url 
            link.setAttribute('download', `${image.title}.${image.extension}`)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            if(error?.response?.status === 404) {
                toast.error('Image not found.')
            }else {
                toast.error('Error while downloading the image try again later.')
                console.log(error)
            }
        }
    }

    return (
        <div className="card mb-3">
            <div className="card-header bg-white">
                <h5 className="mt-2">
                    Purchases
                </h5>
            </div>
            <div className="card-body">
                {
                    user?.purchases?.length > 0 ? 
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
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user?.purchases?.map(purchase => (
                                            <tr key={purchase.id}>
                                                <td scope="row">
                                                    <img 
                                                        src={purchase.image.image_url} 
                                                        alt={purchase.image.title} 
                                                        width={80}
                                                        height={80}
                                                        className="img-fluid rounded"
                                                    />
                                                </td>
                                                <td>{purchase.image.title}</td>
                                                <td>
                                                    <button className="btn btn-secondary btn-sm"
                                                        onClick={() => downloadImage(purchase.image)}
                                                    >
                                                        <i className="bi bi-download"></i>
                                                    </button>
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
                                No purchases yet!
                            </div>
                        </div>
                    </div>    
                }
            </div>
        </div>
    )
}
