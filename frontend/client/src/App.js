import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Index";
import About from "./Pages/About/About";
import Listing from "./Pages/Listing/Listing";
import Footer from './components/Footer/Footer.js';
import PageNotFound from "./Pages/NotFound/PageNotFound.js";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.js";
import { createContext, useEffect, useState } from "react";
import Cart from "./Pages/Cart/Cart.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import LoaderImage from './assets/Images/loading.gif';
import { getAllProduct } from "./Api/authAPI.jsx";

const MyContext = createContext();

function App() {
  const [productData, setProductData] = useState([]);
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
    getCartData();

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }, []);

  const fetchProductData = async () => {
    try {
      const data = await getAllProduct();
      setProductData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false);
    }
  };

  const openFilters = () => {
    setIsopenFilters(!isOpenFilters)
  }

  const getCartData = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  };

  const addToCart = async (item) => {
    // Check if the item already exists in the cart
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // If the item already exists, increase the quantity
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      // If the item does not exist, add it to the cart with quantity 1
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    // Update the cart items in the state
    setCartItems(updatedCartItems);

    // Persist cart data in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


  const removeItemsFromCart = (id) => {
    console.log("Removing item from cart - to be implemented");
  }

  const emptyCart = () => {
    console.log("Emptying cart - to be implemented");
  }

  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }

  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }

  const value = {
    cartItems,
    setCartItems,
    addToCart,
    getCartData,
    removeItemsFromCart,
    emptyCart,
    fetchProductData,
    isOpenFilters,
    openFilters,
    isLogin,
    signOut,
    signIn
  };

  return (
    productData.length !== 0 && (
      <BrowserRouter>
        <MyContext.Provider value={value}>
          {isLoading === true && (
            <div className="loader"><img src={LoaderImage} alt="Loading..." /></div>
          )}

          <Header data={productData} />

          <Routes>
            <Route exact path="/" element={<Home data={productData} />} />
            <Route exact path="/cat/:id" element={<Listing data={productData} single={true} />} />
            <Route exact path="/cat/:id/:id" element={<Listing data={productData} single={false} />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;
export { MyContext };