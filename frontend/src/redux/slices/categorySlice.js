import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

const initialState = {
  categories: [],
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const { data } = await axios.get(`${API_BASE_URL}/categories`)
        return data
    }
)

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload.data
        })
    }
})

const categoryReducer = categorySlice.reducer

export default categoryReducer