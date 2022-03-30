import React from 'react';
import styles from './slider.module.css'
import Frog from './image.png'
import SliderLogo from './sliderLogo.png'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import {Navigation} from 'swiper'


const Slider = () => {

    const {slider, sliderLeft, sliderTitle, sliderBtn, sliderRight, sliderContent, sliderInfo, sliderArrowRight, sliderArrowIcon} = styles;

    return (
        <section className={slider}>
            <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
                <SwiperSlide>
                    <div className={sliderContent}>
                        <div className={sliderLeft}>
                            <img src={SliderLogo} alt=""/>
                            <div className={sliderInfo}>
                                <h2 className={sliderTitle}><span>Stan Smith,</span> Forever!</h2>
                                <button type='button' className={sliderBtn}>Купить</button>
                            </div>
                        </div>

                        <div className={sliderRight}>
                            <img src={Frog} alt=""/>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={sliderContent}>
                        <div className={sliderLeft}>
                            <img src={SliderLogo} alt=""/>
                            <div className={sliderInfo}>
                                <h2 className={sliderTitle}><span>Stan Smith,</span> Forever!</h2>
                                <button type='button' className={sliderBtn}>Купить</button>
                            </div>
                        </div>

                        <div className={sliderRight}>
                            <img src={Frog} alt=""/>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </section>
    );
};

export default Slider;