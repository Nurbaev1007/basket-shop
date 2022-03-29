import React, {useContext} from 'react';
import {CustomContext} from "../../context";
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'

import styles from './order.module.css'

const Order = () => {

    const {cart, deleteShoesInCart, postOrders, setCart} = useContext(CustomContext);

    const {
        register,
        formState : {
            errors
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const navigate = useNavigate();

    const createOrder = (data) => {
        const toDate = (date) => {
            return new Intl.DateTimeFormat('ru-Ru', {
                day:'2-digit',
                month:'2-digit',
                year:'numeric',
            }).format(new Date(date))
        };


      postOrders({
          ...data,
          info: data.info ?  data.info : 'no info',
          order: cart,
          price: cart.reduce((acc, rec) => acc + rec.price, 0),
          nds: Math.ceil(cart.reduce((acc, rec) => acc + rec.price, 0) / 100 * 5),
          change: data.money - cart.reduce((acc, rec) => acc + rec.price, 0),
          date: toDate( new Date())
      });

        setCart([]);
        navigate('/buy');
        reset()
    };

    return (
        <section className='section'>
            <h2 className={styles.title}>Заказ</h2>

            <div className={styles.row}>
                <form onSubmit={handleSubmit(createOrder)} action="" className={styles.form}>
                    <div className={styles.formItem}>
                        <label htmlFor="name" className={styles.formLabel}>Имя</label>
                        <input {...register('name', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })} type="text" className={styles.formInput}/>
                    </div>
                    <span className={styles.error}>
                        { errors?.name && errors?.name.message }
                    </span>

                    <div className={styles.formItem}>
                        <label htmlFor="tel" className={styles.formLabel}>Телефон</label>
                        <input {...register('tel', {
                            required : 'Это поле обязательно для заполнения',
                            pattern: {
                                value: '/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/',
                                message: "Invalid phone no",
                            },
                        })} type="tel" className={styles.formInput}/>
                    </div>
                    <span className={styles.error}>
                        { errors?.tel && errors?.tel.message }
                    </span>

                    <div className={styles.formItem}>
                        <label htmlFor="city" className={styles.formLabel}>Город</label>
                        <input {...register('city', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })}  type="text" className={styles.formInput}/>
                    </div>
                    <span className={styles.error}>
                        { errors?.city && errors?.city.message }
                    </span>

                    <div className={styles.formItem}>
                        <label htmlFor="street" className={styles.formLabel}>Улица</label>
                        <input {...register('street', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })} type="text" className={styles.formInput}/>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="info" className={styles.formLabel}>Дополнительная информация</label>
                        <textarea {...register('info')} className={styles.formTextarea}/>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="pay" className={styles.formLabel}>Способ оплаты *</label>
                        <select {...register('pay')} name="pay" className={styles.formSelect}>
                            <option value="Наличные">Наличные</option>
                            <option value="Demir">Demir Bank</option>
                            <option value="Optima">Optima Bank</option>
                        </select>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="money" className={styles.formLabel}>Вносимая сумма *</label>
                        <input {...register('money', {
                            required : 'Это поле обязательно для заполнения',
                            min: {
                                value: cart.reduce((acc, rec) => acc + rec.price, 0),
                                message: `Ваша сумма не дложен быть меньше чем ${cart.reduce((acc, rec) => acc + rec.price, 0)}`
                            }
                        })} type="number" className={styles.formInput}/>
                    </div>
                    <span className={styles.error}>
                        { errors?.money && errors?.money.message }
                    </span>

                    <div className={styles.formItem}>
                        <label htmlFor="checkbox" className={styles.formLabel}>Условия *</label>
                        <div className={styles.checkboxBlock}>
                            <input {...register('checkbox', {
                                required: ''
                            })}  type="checkbox" className={styles.checkbox}/>
                            <span className={styles.checkboxText}>С условиями доставки согласен *</span>
                        </div>
                        <span className={styles.error}>
                        { errors?.checkbox && errors?.checkbox.message }
                    </span>
                    </div>

                    <button type='submit' className={styles.formBtn}>Заказать</button>
                </form>

                <div className={styles.right}>
                    <ul className={styles.list}>
                        {cart.map((el) => (
                            <li key={el.id} className={styles.item}>
                                <img className={styles.itemImg} src={el.imageUrl} alt=""/>
                                <div className={styles.itemCenter}>
                                    <h4 className={styles.itemTitle}>{el.title}</h4>
                                    <p className={styles.itemPrice}>{el.price} rub</p>
                                </div>
                                <button type='button' className={styles.itemBtn}
                                        onClick={() => deleteShoesInCart(el.id)}>x
                                </button>
                            </li>
                        ))}
                    </ul>

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
                    </div>
                </div>
            </div>
</section>
);
};

export default Order;