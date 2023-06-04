"use client";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import "swiper/css";
import "swiper/css/navigation";
import Video from "yet-another-react-lightbox/plugins/video";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Lightbox } from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
const SwiperButtonNext = ({ children }) => {
  const swiper = useSwiper();
  return (
    <div
      className={"swiper-button-next opacity-0 group-hover/slider:opacity-100"}
      onClick={() => swiper.slideNext()}
      style={{ color: "white", "--swiper-navigation-size": "50px" }}
    >
      {children}
    </div>
  );
};
const SwiperButtonPrev = ({ children }) => {
  const swiper = useSwiper();
  return (
    <div
      className={"swiper-button-prev opacity-0 group-hover/slider:opacity-100"}
      onClick={() => swiper.slidePrev()}
      style={{
        color: "white",
        "--swiper-navigation-size": "50px",
      }}
    >
      {children}
    </div>
  );
};
const CustomSlider = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image
        className={"min-h-[300px] w-full object-cover"}
        src={
          process.env.NEXT_PUBLIC_API_URL + item?.image?.data?.attributes?.url
        }
        alt={item?.image?.data?.attributes?.name}
        width={1680}
        height={945}
      />
      {item?.video && (
        <Lightbox
          open={open}
          carousel={{ finite: true }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          plugins={[Video]}
          close={() => setOpen(false)}
          slides={[
            {
              type: "video",
              sources: [{ src: item?.button_link, type: "video/mp4" }],
              width: 1280,
              autoPlay: true,
              height: 720,
              controls: true,
            },
          ]}
        ></Lightbox>
      )}
      <div
        className={
          "absolute bottom-0 h-full w-full bg-[linear-gradient(0deg,_#000_0,_transparent_100%)] opacity-50 md:h-1/2"
        }
      ></div>
      <div className={"absolute bottom-0 left-0 right-0 top-0"}>
        <div className={"page-container h-full"}>
          <div
            className={
              "flex h-full flex-col justify-between px-0 pb-[56px] pt-[30px] text-center md:justify-end md:pb-[70px] md:text-left"
            }
          >
            <ReactMarkdown
              className={
                "heading-1 whitespace-pre-wrap text-white md:mb-[15px]"
              }
            >
              {item?.title}
            </ReactMarkdown>
            <a
              className={"button-main button-white"}
              href={item?.video ? "" : item?.button_link}
              onClick={(e) => {
                if (item?.video) {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            >
              {item?.button_text}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default function HomeSlider({ sliders }) {
  return (
    <Swiper
      className={"swiper-container section-page group/slider home-slider"}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 }}
    >
      {sliders?.data?.attributes?.top_slider?.map((item, index) => (
        <SwiperSlide className={"swiper-slide max-h-[768px]"} key={index}>
          <CustomSlider item={item} />
        </SwiperSlide>
      ))}
      <SwiperButtonPrev />
      <SwiperButtonNext />
    </Swiper>
  );
}
