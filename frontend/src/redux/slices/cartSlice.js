import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const image = action.payload
            let imageItem = state.cartItems.find(item => item.image_id === image.image_id)
            if(imageItem) {
                toast.info('Image already added to your cart.')
            }else {
                state.cartItems = [image, ...state.cartItems]
                toast.success('Image added to your cart.')
            }
        },
        removeFromCart(state, action) {
            const image = action.payload
            state.cartItems = state.cartItems.filter(item => item.image_id !== image.image_id)
            toast.success('Image removed from your cart.')
        },
        clearCartItems(state) {
            state.cartItems = []
            toast.info('Cart cleared.')
        },
        setCartItems(state, action) {
            state.cartItems = action.payload
        }
    }
})

const cartReducer = cartSlice.reducer

export const { addToCart, removeFromCart, clearCartItems, setCartItems } = cartSlice.actions

export default cartReducer