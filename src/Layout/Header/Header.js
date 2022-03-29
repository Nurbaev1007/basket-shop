import React, {useContext} from 'react';
import styles from './header.module.css'
import {MdOutlineLocalGroceryStore} from 'react-icons/md'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiOutlineShopping} from 'react-icons/ai'
import Logo from './logo.png'
import {Link} from 'react-router-dom'
import {CustomContext} from "../../context";

const Header = ({isCart, setIsCart}) => {
    const {header, headerNav, headerLeft, headerSubtitle, headerRight, headerRightText, headerRightBasket} = styles;

    const {cart, favourites} = useContext(CustomContext);

    return (
            <header className={header}>
                <nav className={headerNav}>
                    <Link to='/'>
                        <div className={headerLeft}>
                            <img src={Logo} alt="logo" />
                            <div>
                                <h1>REACT SNEAKERS</h1>
                                <span className={headerSubtitle}>Магазин лучших кроссовок</span>
                            </div>
                        </div>
                    </Link>

                    <div className={headerRight}>
                        <div className={headerRightBasket}>
                            <span style={{cursor: 'pointer'}} onClick={() => setIsCart(true)}>
                                <MdOutlineLocalGroceryStore/>
                            </span>
                            <p className={headerRightText}>{cart.reduce((acc, rec) => acc + rec.price, 0)} rub</p>
                        </div>

                       <Link to='/favourites'>
                           <div>
                               <AiOutlineHeart/>
                               <sup style={{fontSize: '12px'}}>{favourites.length > 9 ? '9+' : favourites.length ? favourites.length : ''}</sup>
                           </div>
                       </Link>

                       <Link to='/buy'>
                           <div>
                               <AiOutlineShopping/>
                           </div>
                       </Link>
                    </div>
                </nav>
            </header>
    );
};

export default Header;