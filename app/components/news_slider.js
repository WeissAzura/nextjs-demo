"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import joinClass from "@/app/lib/joinClass";
import { get } from "lodash";

export default function Slider({ data, mainColor }) {
  const [slide1, setSlide1] = useState(null);
  const [slide2, setSlide2] = useState(null);
  const [slide3, setSlide3] = useState(null);
  const bigSlider = data.map((item) => {
    let imageUrl = get(item, "image.data.attributes.url", "");
    let imageAlt = get(item, "image.data.attributes.name", "");
    return (
      <SwiperSlide
        className={"swiper-container swiper-slide h-full w-full"}
        key={item.id}
      >
        <Image
          className={"h-full object-cover object-center"}
          src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
        />
      </SwiperSlide>
    );
  });
  const smallSlider = data.map((item) => {
    let imageUrl = get(item, "image.data.attributes.url", "");
    let imageAlt = get(item, "image.data.attributes.name", "");
    return (
      <SwiperSlide
        className={"swiper-container swiper-slide max-w-[600px]"}
        key={item?.id}
      >
        <Image
          className={"max-h-[336px] max-w-[600px] object-cover object-center"}
          src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
        />
      </SwiperSlide>
    );
  });
  const textSlider = data.map((item) => {
    let content = get(item, "content", "");
    return (
      <SwiperSlide className={"swiper-container swiper-slide"} key={item?.id}>
        <div className={"h-full bg-[#f3f3f3] px-[60px] py-[40px]"}>
          <ReactMarkdown className={"paragraph whitespace-pre-wrap"}>
            {content}
          </ReactMarkdown>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <div
      className={
        "section-page relative overflow-hidden py-[30px] md:py-[40px] min-[1200px]:py-[60px]"
      }
    >
      <Swiper
        className={"max-h-[554px] w-full mh9:max-h-[1000px]"}
        slidesPerView={1}
        loop={false}
        modules={[Navigation]}
        navigation={{
          nextEl: ".news-button-next",
          prevEl: ".news-button-prev",
        }}
        onSwiper={setSlide1}
        onSlideChange={() => {
          slide2.slideTo(slide1.activeIndex);
          slide3.slideTo(slide1.activeIndex);
        }}
      >
        {bigSlider}
        <div
          className={joinClass(
            "news-button-prev swiper-button-prev border border-solid",
            mainColor === "blue" && "news-button-blue",
            mainColor === "green" && "news-button-green",
            mainColor === "yellow" && "news-button-yellow",
            mainColor === "orange" && "news-button-orange",
            mainColor === "gray" && "news-button-gray"
          )}
          style={{
            "--swiper-navigation-size": "30px",
            height: "50px",
            width: "50px",
          }}
        />
        <div
          className={joinClass(
            "news-button-next swiper-button-next border border-solid",
            mainColor === "blue" && "news-button-blue",
            mainColor === "green" && "news-button-green",
            mainColor === "yellow" && "news-button-yellow",
            mainColor === "orange" && "news-button-orange",
            mainColor === "gray" && "news-button-gray"
          )}
          style={{
            "--swiper-navigation-size": "30px",
            height: "50px",
            width: "50px",
          }}
        />
      </Swiper>
      <div
        className={
          "page-container relative z-50 flex translate-y-[-20px] items-center mh9:translate-y-[-123px]"
        }
      >
        <Swiper
          className={
            "swiper-text-container h-[246px] max-h-full mh9:max-w-[470px]"
          }
          slidesPerView={1}
          loop={false}
          onSwiper={setSlide2}
          onSlideChange={() => {
            slide1.slideTo(slide2.activeIndex);
            slide3.slideTo(slide2.activeIndex);
          }}
        >
          {textSlider}
        </Swiper>
        <Swiper
          className={"swiper-small-container small-slider-image left-[490px]"}
          slidesPerView={1}
          spaceBetween={0}
          loop={false}
          onSwiper={setSlide3}
          onSlideChange={() => {
            slide2.slideTo(slide3.activeIndex);
            slide1.slideTo(slide3.activeIndex);
          }}
        >
          {smallSlider}
        </Swiper>
      </div>
    </div>
  );
}
