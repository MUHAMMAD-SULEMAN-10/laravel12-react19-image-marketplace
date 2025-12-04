import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../layouts/Spinner'
import ImageListItem from './ImageListItem'
import './css/ImageList.css'
import ImageFilter from './ImageFilter'
import { API_BASE_URL } from '../../config/api'


export default function ImageList() {
    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({
        category_id: '',
        extension: '',
        price: 0,
        searchTerm: ''
    })
    const [visibleCount, setVisibleCount] = useState(6)

    useEffect(() => {
        const getImages = async () => {
            setImages(null)
            setError(null)
            setVisibleCount(6)
            try {
                if(isFilterActive()) {
                    const response = await axios.post(`${API_BASE_URL}/filter/images`, filters)
                    setImages(response.data.data)
                }else {
                    const response = await axios.get(`${API_BASE_URL}/images`)
                    setImages(response.data.data)
                }
                
            } catch (error) {
                setError('Error while fetching the images refresh the page again.')
                console.log(error)
            }finally {
                setLoading(false)
            }
        } 
        getImages()
    }, [filters])

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const isFilterActive = () => {
        return (
            filters.category_id !== '' ||
            filters.extension !== '' ||
            filters.price > 0 || 
            filters.searchTerm.trim() !== ''
        )
    }

    if(loading || (images === null && !error)) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner />
            </div>
        )
    }

    if(error) {
        return (
            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    <div className="alert alert-danger">
                        { error }
                    </div>
                </div>
            </div>
        )
    }

    const visibleImagesCount = Array.isArray(images) ? images.slice(0, visibleCount) : []

    const loadMoreImages = () => {
        setVisibleCount((prev) => prev + 6)
    }

    return (
        <div className="my-4">
            <div className="row">
                <div className="col-md-12">
                    <ImageFilter 
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
            </div>
            {
                filters.searchTerm && <div className="my-3">
                    <i className="me-1">
                        Showing results for:
                    </i>
                    <span className="text-danger">
                        { filters.searchTerm }
                    </span>
                </div>
            }
            {
                visibleImagesCount.length > 0 ?
                    <>
                        <div className="masonry-grid">
                            {
                                visibleImagesCount?.map(image => (
                                    <ImageListItem image={image} key={image.id} />
                                ))
                            }
                        </div>
                        {/* Load more button */}
                        {
                            visibleCount < images.length && (
                                <div className="text-center mt-3">
                                    <button className="btn btn-dark btn-sm"
                                        onClick={() => loadMoreImages()}
                                    >
                                        <i className="bi bi-arrow-clockwise"></i> Load more
                                    </button>
                                </div>
                            )
                        }
                    </>
                :
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="alert alert-info">
                                No images found!
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
