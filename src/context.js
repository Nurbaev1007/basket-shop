import React, {createContext, useContext, useState} from "react";
import axios from "axios";

export const CustomContext = createContext();

export const Context = (props) => {

    const [shoes, setShoes] = useState([]);
    const [cart, setCart] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [orders, setOrders] = useState([]);

    const getAllShoes = () => {
      axios(`http://localhost:8080/sneakers`)
          .then(({data}) => setShoes(data))
          .catch((err) => alert('Error'))
    };

    const postFavourites = (item) => {
        axios.post('http://localhost:8080/favourites', {...item})
            .then(() => getAllFavourites())
    };

    const delFavourites = (id) => {
      axios.delete(`http://localhost:8080/favourites/${id}`)
          .then(() => getAllFavourites())
    };

    const getAllFavourites = () => {
        axios.get('http://localhost:8080/favourites')
            .then(({data}) => setFavourites(data))
            .catch((err) => alert('Error'))
    };

    const getAllOrders = () => {
        axios.get('http://localhost:8080/orders')
            .then(({data}) => setOrders(data))
            .catch((err) => alert('Error'))
    };

    const postOrders = (item) => {
        axios.post('http://localhost:8080/orders', {...item})
            .then(() => getAllOrders())
    };


    const addShoesInCart = (id) => {
        let idx = shoes.findIndex((item) => item.id === id);
        setCart([...cart, shoes[idx]])
    };


    const deleteShoesInCart = (id) => {
        setCart(cart.filter((item) => {
            return item.id !== id;
        }))
    };


    const value = {
        shoes,
        setShoes,
        getAllShoes,
        cart,
        setCart,
        addShoesInCart,
        deleteShoesInCart,
        postFavourites,
        favourites,
        setFavourites,
        getAllFavourites,
        delFavourites,
        postOrders,
        orders,
        getAllOrders
    };

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
};