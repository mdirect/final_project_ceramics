import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./app/Layout/Layout";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import axiosInstance, { setAccessToken } from "./shared/lib/axiosInstance";
import AddForm from "./features/AddForm/AddForm";
import OneProductPage from "./pages/OneProductPage";

function App() {
  const [user, setUser] = useState({ status: "logging", data: null });

  useEffect(() => {
    axiosInstance("/api/auth/refreshToken")
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={user} setUser={setUser} />}>
            <Route path="/" element={<MainPage user={user} />} />
            <Route path="/cart" element={<CartPage user={user} />} />
            <Route path="/registery" element={<AuthPage setUser={setUser} />} />
            <Route path="/addproduct" element={<AddForm user={user} />} />
            <Route
              path="/product/:productId"
              element={<OneProductPage user={user} />}
            />
            <Route
              path="/account"
              element={<AccountPage user={user} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
