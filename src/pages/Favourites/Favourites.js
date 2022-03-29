import React, {useContext, useEffect} from 'react';
import {CustomContext} from "../../context";
import styles from "./favourites.module.css";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'


import { BsCheck } from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import Image from "../../Assets/image9.png";
import {AiOutlineArrowLeft} from "react-icons/ai";

const Favourites = () => {

    const {favourites, addShoesInCart, deleteShoesInCart, cart, delFavourites} = useContext(CustomContext);
    const navigate = useNavigate();


    return (
        <section className='section'>

            {
                favourites.length ?
                    <>
                        <div className={styles.back}>
                            <Link to='/' style={{color: '#C8C8C8'}}>
                                <div className={styles.arrow}><AiOutlineArrowLeft/></div>
                            </Link>
                            <h2 className={styles.title}>Мои избранные</h2>
                        </div>

                        <div className={styles.row}>
                            {
                                favourites.map((item) => (
                                    <div className={styles.card} key={item.id}>
                                        <button type='button' className={styles.cardLike} onClick={() => delFavourites(item.id)}><FcLike/></button>
                                        <img src={item.imageUrl} alt="img" className={styles.cardImg}/>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <div className={styles.cardFooter}>
                                            <div className={styles.cardPrice}>
                                                <h4 className={styles.cardPriceTitle}>Цена:</h4>
                                                <p className={styles.cardPriceNum}>{item.price.toString().slice(0, -3)}, {item.price.toString().substr(-3,)} .сом</p>
                                            </div>
                                            {
                                                cart.filter((el) => el.id === item.id).length ?
                                                    <button type='button' className={styles.cardBtnCheck} onClick={() => deleteShoesInCart(item.id)}> <BsCheck/> </button>
                                                    :
                                                    <button type='button' className={styles.cardBtn} onClick={() => addShoesInCart(item.id)}>+</button>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div></>
                    :
                    <div className={styles.emptyRow}>
                        <div className={styles.emptySmiley}>
                            <img src={Image} alt="image"/>
                        </div>
                        <p className={styles.emptyTitle}>Закладок нет :(</p>
                        <p className={styles.emptySubtitle}>Вы ничего не добавляли в закладки</p>

                        <button type='button' onClick={() => navigate('/')} className={styles.emptyBtn}>← Вернуться назад</button>
                    </div>
            }




        </section>
    );
};

export default Favourites;