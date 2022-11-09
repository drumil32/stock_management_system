import React, { useEffect, useState } from 'react';
import stockList from "./components/StockDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import SignOut from "./pages/SignOut";
import { useCookies } from 'react-cookie';
import Profile from './pages/Profile';
import axios from "axios";


const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=bv1uf4v48v6o5ed6h88g`;


export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [userDetails, setUserDetails] = useState({});

  function handleSetCookie(key, data) {
    setCookie(`${key}`, data, { path: '/' });
  }

  function handleRemoveCookie(key) {
    removeCookie(`${key}`);
  }

  const [stockData, setStocksData] = useState([]);

  useEffect(() => {
    
    const getStocksData = (stock) => {
      return axios
        .get(`${BASE_URL}${stock}${KEY_URL}`)
        .catch((error) => {
          console.error("Error", error.message);
        });
    };
    let promises = [];
    let testData = [];
    stockList.map((stock) => {
      promises.push(
        getStocksData(stock)
          .then((res) => {
            testData.push({
              name: stock,
              price: res.data.c
            });
          })
      )
    });

    Promise.all(promises).then(() => {
      setStocksData(testData);
    })
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cookies={cookies} userDetails={userDetails} />}>
          <Route index element={<Home stockData={stockData} cookies={cookies} handleSetCookie={handleSetCookie} userDetails={userDetails} setUserDetails={setUserDetails}
          />} />
          <Route path="Home" element={<Home stockData={stockData} cookies={cookies} handleSetCookie={handleSetCookie} userDetails={userDetails} setUserDetails={setUserDetails} />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="SignIn" element={<SignIn cookies={cookies} handleSetCookie={handleSetCookie} setUserDetails={setUserDetails} />} />
          <Route path="SignOut" element={<SignOut cookies={cookies} handleSetCookie={handleSetCookie} handleRemoveCookie={handleRemoveCookie} setUserDetails={setUserDetails} userDetails={userDetails} />} />
          <Route path="About" element={<About />} />
          <Route path="Profile" element={<Profile stockData={stockData} cookies={cookies} handleSetCookie={handleSetCookie} userDetails={userDetails} setUserDetails={setUserDetails} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}