import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ImageFilter({filters, handleFilterChange}) {
    const { categories } = useSelector(state => state.category)
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const [chosenPrice, setChosenPrice] = useState(0) 
    const [searchTerm, setSearchTerm] = useState('') 


    // Filter by category
    const filterByCategory = (category) => {
        if(filters.category_id === category.id) {
            handleFilterChange('category_id', '')
        }else {
            handleFilterChange('category_id', category.id)
        }
    }

    // Filter by extension
    const filterByExtension = (extension) => {
        if(filters.extension === extension) {
            handleFilterChange('extension', '')
        }else {
            handleFilterChange('extension', extension)
        }
    }

    return (
        <div className="mb-3">
            {/* Filter by category */}
            <nav className="nav nav-pills flex-column flex-sm-row">
                {
                    categories?.map(category => (
                        <button 
                            className={`flex-sm-fill text-sm-center nav-link mx-1 mb-1 ${filters.category_id === category.id ? 'bg-danger text-white rounded-0' : 'bg-secondary rounded text-white'}`}
                            key={category.id}
                            onClick={() => filterByCategory(category)}
                        >
                            { category.name }
                        </button>
                    ))
                }
            </nav>
            {/* Filter by extension */}
            <nav className="nav nav-pills flex-column flex-sm-row">
                {
                    extensions?.map(extension => (
                        <button 
                            className={`flex-sm-fill text-sm-center nav-link mx-1 mb-1 ${filters.extension === extension ? 'bg-danger text-white rounded-0' : 'bg-secondary rounded text-white'}`}
                            key={extension}
                            onClick={() => filterByExtension(extension)}
                        >
                            { extension }
                        </button>
                    ))
                }
            </nav>
            {/* Filter by price */}
            <div className="row my-3">
                <div className="col-md-6 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                                <div className="flex-grow-1">
                                    <label htmlFor="price" className="form-label fw-bold">
                                        Show images priced up to: <span className="text-danger">${ chosenPrice || filters.price }</span>
                                    </label>
                                    <input type="range" name="price" id="price"
                                        className="form-range"
                                        min={0}
                                        max={1000}
                                        step={1}
                                        value={chosenPrice || filters.price}
                                        onChange={(e) => setChosenPrice(e.target.value)}
                                    />
                                    {
                                        filters.price > 0 && <p>
                                            <i className="text-muted">
                                                Set the price to 0 and click apply to show all the images.
                                            </i>
                                        </p>
                                    }
                                </div>
                                <button className="btn btn-dark btn-sm"
                                    onClick={() => handleFilterChange('price', chosenPrice)}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search images */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                                <div className="flex-grow-1">
                                    <input type="search" name="search" id="search" 
                                        className="form-control"
                                        placeholder="Search by title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-dark btn-sm"
                                    onClick={() => handleFilterChange('searchTerm', searchTerm)}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            {
                                filters.searchTerm && <p>
                                    <i className="text-muted">
                                        Click on the search button with an empty field to show all the images.
                                    </i>
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
