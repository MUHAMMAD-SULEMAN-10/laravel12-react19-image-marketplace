import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../slices/categorySlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../slices/cartSlice'
import userReducer from '../slices/userSlice'
import reviewReducer from '../slices/reviewSlice'
import wishlistReducer from '../slices/wishListSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    category: categoryReducer,
    cart: cartReducer,
    user: userReducer,
    review: reviewReducer,
    wishlist: wishlistReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { 
    store,
    persistor
}