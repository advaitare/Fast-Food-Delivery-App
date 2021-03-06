import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import About from './components/About/About';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

import PrivateRoute from './PrivateRoutes/PrivateRoute';
import Profile from './components/UserDashboard/Profile';

import AdminRoute from './PrivateRoutes/AdminRoute';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateCategory from './components/AdminDashboard/CreateCategory';
import CreateProduct from './components/AdminDashboard/CreateProduct';
import Orders from './components/AdminDashboard/Order';
import ManageProducts from './components/AdminDashboard/ManageProducts';
import ManageCategories from './components/AdminDashboard/ManageCategories';
import UpdateCategory from './components/AdminDashboard/UpdateCategory';
import UpdateProduct from './components/AdminDashboard/UpdateProduct';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main className='py-3' >
        
          {/* User Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/product/:productId" component={Product} />
          <Route exact path="/cart" component={Cart} />
          
        
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />
          <PrivateRoute exact path="/profile/:userId" component={Profile} />
          {/* Admin Routes */}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/create/category"
            component={CreateCategory}
          />
          <AdminRoute exact path="/create/product" component={CreateProduct} />
          <AdminRoute exact path="/admin/orders" component={Orders} />
         
          <AdminRoute exact path="/admin/products" component={ManageProducts} />
          <AdminRoute
            exact
            path="/admin/product/update/:productId"
            component={UpdateProduct}
          />
          <AdminRoute
            exact
            path="/admin/categories"
            component={ManageCategories}
          />
          <AdminRoute
            exact
            path="/admin/category/update/:categoryId"
            component={UpdateCategory}
          />
       
        </main>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
