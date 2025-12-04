import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  imagesList: [],
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            const image = action.payload
            let imageItem = state.imagesList.find(item => item.id === image.id)
            if(imageItem) {
                state.imagesList = state.imagesList.filter(item => item.id !== image.id)
                toast.info('Image removed from your wishlist.')
            }else {
                state.imagesList = [image, ...state.imagesList]
                toast.success('Image added to your wishlist.')
            }
        }
    }
})

const wishlistReducer = wishlistSlice.reducer

export const { addToWishlist } = wishlistSlice.actions

export default wishlistReducer