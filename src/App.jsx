import React from 'react';  
import Navbar from './components/Navbar';
import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import {Toaster} from "react-hot-toast";
import Footer from './components/Footer.jsx';
import { useAppContext } from './context/AppContext.jsx';
import Login from './components/Login.jsx';
import AllProducts from './pages/AllProducts.jsx';
import ProductCategory from './pages/ProductCategory.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import AddAddress from './pages/AddAddress.jsx';
import MyOrders from './pages/MyOrders.jsx';
import SellerLogin from './components/SellerLogin.jsx';
import SellerLayout from './pages/seller/SellerLayout.jsx';
import AddProduct from './pages/seller/AddProduct.jsx';
import Orders from './pages/seller/Orders.jsx';
import ProductList from './pages/seller/ProductList.jsx';
import Loading from './components/Loading.jsx';

const App = () => {

  const isSellerPath=useLocation().pathname.includes("seller");
  const {showuserLogin,isSeller}=useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerPath? null:<Navbar/>}
      {showuserLogin ? <Login /> : null }
      

      <Toaster/>
      
      <div className={`${isSellerPath? "":"px-6 md:px-16 lg:px-24 l:px-32"}`}>
        <Routes>
          <Route path='/'element={<Home/>} />
          <Route path='/products'element={<AllProducts/>} />
          <Route path='/products/:category'element={<ProductCategory/>} />
          <Route path='/products/:category/:id'element={<ProductDetails/>} />
          <Route path='/cart'element={<Cart/>} />
          <Route path='/add-address'element={<AddAddress/>} />
          <Route path='/my-orders'element={<MyOrders/>} />
          <Route path='/loader'element={<Loading/>} />
          <Route path='/seller' element={isSeller? <SellerLayout/> : <SellerLogin/>}>
              <Route index element={isSeller ? <AddProduct/> : null} />
              <Route path='product-list' element={<ProductList/>} />
              <Route path='orders' element={<Orders/>} />
          </Route>

          {/* Add more routes as needed */}
        </Routes>
      </div>

      {!isSellerPath && <Footer/>}
      
      
    </div>
  );
};

export default App;