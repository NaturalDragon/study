/** @format */

import * as React from 'react'
import Swiper from 'swiper'
import {IBannerProps} from '@/interfaces/recommend'
import 'swiper/swiper-bundle.css'
import './slider.less'
function Slider(props:IBannerProps) {
    const [sliderSwiper, setSliderSwiper] = React.useState(null)
    const {bannerList} = props
    React.useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper('.slider-container', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {el: '.swiper-pagination'},
            })
            setSliderSwiper(newSliderSwiper)
        }
    }, [bannerList.length, sliderSwiper])
    return (
        <div className="sliderContainer">
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {bannerList.map(slider => {
                        return (
                            <div className="swiper-slide" key={slider.imageUrl}>
                                <div className="slider-nav">
                                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}

export default React.memo(Slider)
