import React, {useContext, useEffect, useState} from 'react';
import Header from "./Header/Header";
import {Routes, Route} from 'react-router-dom'
import {CustomContext} from "../context";


import Home from "../pages/Home/Home";
import Buy from "../pages/Buy/Buy";
import Favourites from "../pages/Favourites/Favourites";

import styles from './layout.module.css'
import Cart from "./Cart/Cart";
import axios from "axios";
import Order from "../pages/Order/Order";

const Layout = () => {
    const {layout} = styles;

    const [isCart, setIsCart] = useState(false);
    const {getAllFavourites} = useContext(CustomContext);


    useEffect(() => {
      getAllFavourites()
    }, []);


    return (
        <div className={layout}>
            <Header isCart={isCart} setIsCart={setIsCart}/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/buy' element={<Buy/>}/>
                <Route path='/favourites' element={<Favourites/>}/>
                <Route path='/order' element={<Order/>}/>
            </Routes>
            <Cart isCart={isCart} setIsCart={setIsCart}/>
        </div>
    );
};

export default Layout;