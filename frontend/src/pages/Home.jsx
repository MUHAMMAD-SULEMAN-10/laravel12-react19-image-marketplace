import React, { useEffect } from 'react'
import ImageList from '../components/images/ImageList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../redux/slices/categorySlice'

export default function Home() {
    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(fetchCategories())
        }
    }, [dispatch, categories.length])

    return (
        <ImageList />
    )
}
