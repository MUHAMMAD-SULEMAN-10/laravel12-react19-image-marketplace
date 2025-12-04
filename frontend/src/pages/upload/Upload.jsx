import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'  
import useValidation from '../../components/custom/useValidation'
import './css/upload.css'
import { useNavigate } from 'react-router'
import Spinner from '../../components/layouts/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, getConfig } from '../../config/api'
import { setCredentials } from '../../redux/slices/userSlice'

const INITIAL_FILE_INFO = {
    fileSelected: null,
    title: '',
    description: '',
    price: '',
    category_id: ''
}

export default function Upload() {
    const { token, user } = useSelector(state => state.user)
    const [image, setImage] = useState(null)
    const { categories } = useSelector(state => state.category)
    const [validationErrors, setValidationErrors] = useState(null)
    const [fileInfo, setFileInfo] = useState(INITIAL_FILE_INFO)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(user?.role === 'buyer') navigate('/') 
    }, [user.role])

    const handleDrop = (e) => {
        e.preventDefault()
        handleFile(e.dataTransfer.files[0])
    }

    const handleFileClick = (e) => {
        handleFile(e.target.files[0])
        e.target.value = ''
    }

    const triggerFileClick = () => {
        inputRef.current.click()
    }

    const handleFile = (file) => file && displayImage(file)

    const displayImage = (file) => {
        const reader = new FileReader()
        reader.onload = () => setImage(reader.result)
        reader.readAsDataURL(file)
        setFileInfo(prev => ({...prev, fileSelected: file}))
    }

    const uploadImage = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('file', fileInfo.fileSelected)
        formData.append('title', fileInfo.title)
        formData.append('description', fileInfo.description)
        formData.append('price', fileInfo.price)
        formData.append('category_id', fileInfo.category_id)

        try {
            const response = await axios.post(`${API_BASE_URL}/images`, formData, getConfig(token, 'multipart/form-data'))
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
                            Upload your image
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => uploadImage(e)}>
                            <div id="dropzone"
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onDragLeave={(e) => e.preventDefault()}
                                onClick={triggerFileClick}
                                className="rounded p-5 text-center"
                            >
                                <label htmlFor="file-input" className="form-label mb-2">
                                    Drag & Drop Your Image Here or Click to Select a File
                                </label>
                                <input type="file"
                                    name="image"
                                    id="file-input"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileClick}
                                    ref={inputRef}
                                    hidden
                                />
                                {
                                    image && <img src={image} alt="preview" 
                                        className="img-fluid mt-3 rounded shadow-sm"
                                        style={{maxHeight: '200px'}}    
                                    />
                                }
                                { useValidation(validationErrors, 'file') }
                            </div>
                            <div className="my-3">
                                <label htmlFor="title" className="form-label">
                                    Title*
                                </label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    className="form-control"
                                    placeholder="Title*"
                                    value={fileInfo.title}
                                    onChange={(e) => setFileInfo((prev) => ({...prev, title: e.target.value}))}
                                />
                                { useValidation(validationErrors, 'title') }
                            </div>
                            <div className="my-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea 
                                    rows="5" 
                                    name="description" 
                                    id="description" 
                                    className="form-control"
                                    placeholder="Description"
                                    value={fileInfo.description}
                                    onChange={(e) => setFileInfo((prev) => ({...prev, description: e.target.value}))}
                                ></textarea>
                                { useValidation(validationErrors, 'description') }
                            </div>
                            <div className="my-3">
                                <label htmlFor="category" className="form-label">
                                    Category*
                                </label>
                                <select 
                                    name="category" 
                                    id="category" 
                                    className="form-control"
                                    value={fileInfo.category_id}
                                    onChange={(e) => setFileInfo((prev) => ({...prev, category_id: e.target.value}))}
                                >
                                    <option value="">Select category</option>
                                    {
                                        categories?.map(category => (
                                            <option 
                                                key={category.id}
                                                value={category.id}>
                                                    { category.name }
                                            </option>
                                        ))
                                    }
                                </select>
                                { useValidation(validationErrors, 'category_id') }
                            </div>
                            <div className="my-3">
                                <label htmlFor="price" className="form-label">
                                    Price*
                                </label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    id="price" 
                                    min="1"
                                    className="form-control"
                                    placeholder="Price*"
                                    value={fileInfo.price}
                                    onChange={(e) => setFileInfo((prev) => ({...prev, price: e.target.value}))}
                                />
                                { useValidation(validationErrors, 'price') }
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
                </div>
            </div>
        </div>
    )
}
