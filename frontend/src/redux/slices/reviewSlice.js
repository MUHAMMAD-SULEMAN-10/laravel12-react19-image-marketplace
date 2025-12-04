import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reviews: [],
    selectedReview: null
}

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload
        },
        removeReview(state, action) {
            const id = action.payload
            state.reviews = state.reviews.filter(r => r.id !== id)
        },
        setSelectedReview(state, action) {
            state.selectedReview = action.payload
        },
        clearSelectedReview(state) {
            state.selectedReview = null
        }
    }
})

const reviewReducer = reviewSlice.reducer

export const { setReviews, removeReview, setSelectedReview, clearSelectedReview } = reviewSlice.actions

export default reviewReducer