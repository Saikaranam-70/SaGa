import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import EmailVerificationSuccess from './components/EmailVerification/EmailVerificationSuccess'
import SignInUp from './components/SignInSignUp/SignInUp'
import Register from './Admin/Register/Register'
import AdminLogin from './Admin/Login/AdminLogin'
import Admin from './Admin'
import AdminProductPanel from './Admin/Products/AdminProductPanel'
import AddOffer from './Admin/AddOffer/AddOffer'
import CategoryPage from './components/CategoryPage/CategoryPage'
import ShopNow from './components/ShopNow/ShopNow'
import ProductPage from './components/ProductPage/ProductPage'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/RestPassword/ResetPassword'
import Cart from './components/Cart/Cart'
import Orders from './components/Orders/Orders'

const User = () => {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verificationSuccess' element={<EmailVerificationSuccess />} />
        <Route path='/signin-signup' element={<SignInUp />} />
        <Route path='/admin/register' element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Admin />} />
        <Route path='/admin/products' element={<AdminProductPanel />} />
        <Route path='/admin/offer' element={<AddOffer />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path='/shop' element={<ShopNow />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/cart' element={<Cart userId={userId} token={token} />}/>
        <Route path='/orders' element={<Orders userId={userId} token={token} />}/>
      </Routes>
    </div>
  )
}

export default User
