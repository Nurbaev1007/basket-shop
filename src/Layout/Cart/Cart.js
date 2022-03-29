import React, {useContext} from 'react';
import styles from './cart.module.css'
import {CustomContext} from '../../context'
import {useNavigate} from 'react-router-dom'
import Image from '../../Assets/image8.png'

const Cart = ({isCart, setIsCart}) => {

    const {cart, deleteShoesInCart} = useContext(CustomContext);

    const navigate = useNavigate();

    const cartClose = (e) => {
        if (e.target.className === styles.overlay) {
            setIsCart(false)
        }
    };

    return (
        <section >
            <div onClick={cartClose} className={styles.overlay} style={{display: isCart ? 'flex' : 'none'}}>
                <div className={styles.cart}>



            {
                cart.length ?
                       <>
                       <div className={styles.cartContent}>
                           <h3 className={styles.cartTitle}>Корзина</h3>
                       <ul className={styles.list}>
                           {cart.map((el) => (
                               <li key={el.id} className={styles.item}>
                                   <img className={styles.itemImg} src={el.imageUrl} alt=""/>
                                   <div className={styles.itemCenter}>
                                       <h4 className={styles.itemTitle}>{el.title}</h4>
                                       <p className={styles.itemPrice}>{el.price} rub</p>
                                   </div>
                                   <button type='button' className={styles.itemBtn} onClick={() => deleteShoesInCart(el.id)}>x</button>
                               </li>
                           ))}

                       </ul>
                       </div>
                       <div className={styles.cartFooter}>
                           <div className={styles.cartFooterItem}>
                               <p className={styles.cartFooterTitle}>Итого</p>
                               <div className={styles.cartFooterLine}/>
                               <p className={styles.itemPrice}>{cart.reduce((acc, rec) => acc + rec.price, 0)} rub</p>
                           </div>
                           <div className={styles.cartFooterItem}>
                               <p>Налог 5%</p>
                               <div className={styles.cartFooterLine}/>
                               <p className={styles.itemPrice}>{Math.ceil(cart.reduce((acc, rec) => acc + rec.price, 0) / 100 * 5)} rub</p>
                           </div>
                           <button type='button' className={styles.cartFooterBtn} onClick={() => {
                               setIsCart(false);
                               navigate('/order')
                           }}>Оформить заказ <span>→</span></button>
                       </div>
                       </>
                    :
                    <div className={styles.empty}>
                        <h3 className={styles.cartTitle}>Корзина</h3>

                        <div className={styles.emptyRow}>
                            <div className={styles.emptySmiley}>
                                <img src={Image} alt="image"/>
                            </div>
                            <p className={styles.emptyTitle}>Корзина пустая</p>
                            <p className={styles.emptySubtitle}>Добавьте хотя бы одну пару <br/> кроссовок, чтобы сделать заказ.</p>

                            <button type='button' onClick={() => setIsCart(false)} className={styles.emptyBtn}>← Вернуться назад</button>

                        </div>

                         </div>
            }
                <div className={styles.line} onClick={() => setIsCart(false)}/>
            </div>
            </div>
        </section>
    );
};

export default Cart;