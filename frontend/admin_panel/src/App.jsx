import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import ProductList from "./pages/ProductList/ProductList.jsx";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";
import CreateProducts from "./pages/ProductList/CreateProducts.jsx";
import ViewProduct from "./pages/ProductList/ViewProduct.jsx";
import SignUp from "./pages/UserLogin/SignUp.jsx";
import Login from "./pages/UserLogin/Login.jsx";
import ProtectedRoute from "./protected_route.jsx";

export const MyContext = createContext();

const App = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true" || false;
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHeaderFooterShown, setisHeaderFooterShown] = useState(true);
  const [user, setUser] = useState(null);

  const values = {
    isLogin,
    setIsLogin,
    isHeaderFooterShown,
    setisHeaderFooterShown,
    user,
    setUser,
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <section className="main flex">
          {isLogin && isHeaderFooterShown && (
            <div
              className={`sidebarWrapper w-[280px] bg-gray-100 transition-all duration-300`}
            >
              <Sidebar />
            </div>
          )}

          <div className={`content_Right flex-1 transition-all duration-300 `}>
            {isLogin && isHeaderFooterShown && (
              <>
                <Header />
                <div className="space mt-[100px]"></div>
              </>
            )}

            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/products/productList"
                element={<ProtectedRoute element={<ProductList />} />}
              />
              <Route
                path="/products/createProduct"
                element={<ProtectedRoute element={<CreateProducts />} />}
              />
              <Route
                path="/products/editProduct/:id"
                element={<ProtectedRoute element={<EditProduct />} />}
              />
              <Route
                path="/products/viewProduct"
                element={<ProtectedRoute element={<ViewProduct />} />}
              />

              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </section>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
