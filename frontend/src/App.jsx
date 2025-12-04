import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import PrivateRoute from "./components/middleware/PrivateRoute"
const Profile =  lazy(() => import("./pages/user/Profile"))
const Success = lazy(() => import("./pages/payments/Success"))
const Navbar = lazy(() => import("./components/layouts/Navbar"))
const Login = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const Cart = lazy(() => import("./pages/cart/Cart"))
const Home = lazy(() => import("./pages/Home"))
const Upload = lazy(() => import("./pages/upload/Upload"))
const ImageDetails = lazy(() => import("./pages/images/ImageDetails"))
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"))


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/upload" element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          } />
          <Route path="/image/:slug" element={
            <ImageDetails />
          } />
          <Route path="/cart" element={
            <Cart />
          } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/pay/success" element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/wishlist" element={
            <Wishlist />
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
