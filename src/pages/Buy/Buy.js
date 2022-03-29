import React, {useContext, useEffect} from 'react';
import {CustomContext} from "../../context";
import {Link, useNavigate} from 'react-router-dom';
import Image from '../../Assets/image10.png'

import styles from './buy.module.css'
import {AiOutlineArrowLeft} from "react-icons/ai";

const Buy = () => {

    const { orders, getAllOrders } = useContext(CustomContext);

    const navigate = useNavigate();

    useEffect(() => {
        getAllOrders()
    }, []);
    return (
        <section  className='section'>


            {
                orders.length ?
                    <>
                        <div className={styles.back}>
                            <Link to='/' style={{color: '#C8C8C8'}}>
                                <div className={styles.arrow}><AiOutlineArrowLeft/></div>
                            </Link>
                            <h2 className={styles.title}>Мои покупки</h2>
                        </div>
                        <div className={styles.row}>
                            {orders.map((item) => (
                                <div className={styles.card} key={item.id}>
                                    <h3 className={styles.id}>Номер заказа: {item.id}</h3>
                                    <p className={styles.date}>Дата заказа: {item.date}</p>
                                    <ul className={styles.list}>
                                        {item.order.map((el) => (
                                            <li className={styles.listItem} key={el.title}>
                                                <img src={el.imageUrl} alt="" className={styles.listItemImg}/>
                                                <div className={styles.listItemInfo}>
                                                    <p className={styles.listItemTitle}>{el.title}</p>
                                                    <p className={styles.listItemPrice}>{el.price} сом.</p>
                                                </div>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                    <p className={styles.price}>Сумма : {item.price} сом.</p>
                                </div>
                            ))
                            }
                        </div>
                    </>

                    :
                    <div className={styles.emptyRow}>
                        <div className={styles.emptySmiley}>
                            <img src={Image} alt="smiley"/>
                        </div>
                        <p className={styles.emptyTitle}>У вас нет заказов</p>
                        <p className={styles.emptySubtitle}> Вы нищеброд? <br/> Оформите хотя бы один заказ.</p>

                        <button type='button' onClick={() => navigate('/')} className={styles.emptyBtn}>← Вернуться назад</button>
                    </div>
            }
        </section>
    );
};

export default Buy;