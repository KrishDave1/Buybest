import './App.css'
import Search from './components/Search';
import Categories from './components/Categories';
import Products from './components/Products';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Cart from './components/Cart';
import Error from './components/Error';
import Contact from './components/Contact';
import StarsCanvas from './components/canvas/Stars';
import Login from './components/Login';
import Register from './components/Register';
import Payments from './components/Payments';
import { useGlobalContext } from './context';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  const { showModal,currentUser } = useGlobalContext()
  return (
    <Router scrollRestoration="auto">
      <main>
        <Navbar />
        {/* {currentUser && <div className="user-info"> <strong className="nav-user-name">Welcome, {currentUser}</strong></div>} */}
        {showModal && <Modal />}
        <Routes>
          <Route path='/' element={
            <>
              <Search />
              <Products />
            </>
          }>
          </Route>
          <Route path='/categories' element={
            <>
              <Search />
              <Categories />
            </>
          }>
          </Route>
          <Route path='/cart' element={
            <>
              <Cart />
            </>
          }>
          </Route>
          <Route path='/contact' element={
            <div className="relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
          }>
          </Route>
          <Route
             path='/profile'
             element={<Profile />}
          >
          </Route>
          <Route path='/login' element={
            <>
              <Login />
            </>
          }>
          </Route>
          <Route path='/register' element={
            <>
              <Register />
            </>
          }>
          </Route>
          <Route path='/forgot-password' element={
            <>
              <ForgotPassword />
            </>
          }>
          </Route>
          <Route path="/payments" element={
            <Payments />
          }>
          </Route>
          <Route path='*' element={
            <>
              <Error />
            </>
          }>
          </Route>
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}
