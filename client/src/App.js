import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import { store } from './redux/store'
// import Loader from './components/Loader/Loader'
import Product from './components/Product/Product'
import Products from './components/Products/Products.js'
import Search from './components/Search/Search'
import LoginRegister from './components/User/LoginRegister/LoginRegister'
import { loadUser } from './redux/actions/user'
import { useSelector } from 'react-redux'
import Options from './components/User/Options/Options'
import Profile from './components/User/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ProfileUpdate from './components/User/Profile/ProfileUpdate'
import PasswordUpdate from './components/User/Profile/PasswordUpdate'
import ForgotPassword from './components/User/Profile/ForgotPassword'
import ResetPassword from './components/User/Profile/ResetPassword'
import Cart from './components/Cart/Cart'
import Shipping from './components/Shipping/Shipping'
import ConfirmOrder from './components/Shipping/ConfirmOrder'
import OrderSuccess from './components/OrderSuccess/OrderSuccess'
import MyOrders from './components/Orders/MyOrders'
import Order from './components/Orders/Order'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import AdminProducts from './components/Admin/AdminProducts/AdminProducts'
import AdminOrders from './components/Admin/AdminProducts/AdminOrders'
import CreateProduct from './components/Admin/AdminProducts/CreateProduct'
import UpdateProduct from './components/Admin/AdminProducts/UpdateProduct'
import UpdateOrderStatus from './components/Admin/AdminProducts/UpdateOrderStatus'
import AdminUsers from './components/Admin/AdminUsers/AdminUsers'
import UpdateUser from './components/Admin/AdminUsers/UpdateUser'
import AdminReviews from './components/Admin/AdminReviews/AdminReviews'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
// import PaymentGateway from './components/PaymentGateway/PaymentGateway'


const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user)




  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Router>
      <Navbar />
      {
        isAuthenticated && <Options user={user} />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/loader" element={<Loader />} /> */}
        <Route path="/product/:prod_id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path="/profile/update" element={
          <PrivateRoute>
            <ProfileUpdate />
          </PrivateRoute>
        } />

        <Route path="/password/update" element={
          <PrivateRoute>
            <PasswordUpdate />
          </PrivateRoute>
        } />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />

        <Route path="/checkout" element={
          <PrivateRoute>
            <Shipping />
          </PrivateRoute>
        } />

        <Route path="/confirm/order" element={
          <PrivateRoute>
            <ConfirmOrder />
          </PrivateRoute>
        } />

        <Route path="/success" element={
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        } />

        <Route path="/orders" element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        } />

        <Route path="/order/:order_id" element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        } />



        {/* ADMIN ROUTES */}

        <Route path="/dashboard" element={
          <PrivateRoute admin={true} >
            <Dashboard />
          </PrivateRoute>
        } />


        <Route path="/admin/products" element={
          <PrivateRoute admin={true} >
            <AdminProducts />
          </PrivateRoute>
        } />


        <Route path="/admin/create/product" element={
          <PrivateRoute admin={true} >
            <CreateProduct />
          </PrivateRoute>
        } />

        <Route path="/admin/product/:prod_id" element={
          <PrivateRoute admin={true} >
            <UpdateProduct />
          </PrivateRoute>
        } />

        <Route path="/admin/orders" element={
          <PrivateRoute admin={true} >
            <AdminOrders />
          </PrivateRoute>
        } />


        <Route path="/admin/order/:order_id" element={
          <PrivateRoute admin={true} >
            <UpdateOrderStatus />
          </PrivateRoute>
        } />

        <Route path="/admin/users" element={
          <PrivateRoute admin={true} >
            <AdminUsers />
          </PrivateRoute>
        } />

        <Route path="/admin/user/:user_id" element={
          <PrivateRoute admin={true} >
            <UpdateUser />
          </PrivateRoute>
        } />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />



        {/* <Route path="/admin/reviews" element={
          <PrivateRoute admin={true} >
            <AdminReviews />
          </PrivateRoute>
        } /> */}



        {/* <Route path="/payment" element={
          <PrivateRoute>
            <PaymentGateway />
          </PrivateRoute>
        } /> */}


        {/* <Route path="/products/:keyword" element={<Products />} /> */}

      </Routes>
      <Footer />
    </Router>
  )
}

export default App