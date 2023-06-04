"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

const CustomSlider = ({ item }) => {
  return (
    <div className={"flex flex-col h-full bg-none border-none"}>
      <div className={"relative before:content-[''] w-full pt-[56.25%]"}>
        <Image
          className={
            "absolute top-0 left-0 bottom-0 right-0 object-cover object-center w-full"
          }
          src={
            process.env.NEXT_PUBLIC_API_URL +
            item?.attributes?.thumbnail?.data?.attributes?.url
          }
          alt={item?.attributes?.thumbnail?.data?.attributes?.name}
          width={355}
          height={200}
        />
      </div>
      <Link
        className={
          "bg-white mx-[20px] py-[20px] px-[30px] flex-[1_0_auto] text-center cursor-pointer no-underline hover:underline translate-y-[-40px]"
        }
        href={"/news/" + item?.attributes?.slug}
      >
        <p className={"mb-[1rem] paragraph"}>{item?.attributes?.excerpt}</p>
        <span className="link font-semibold flex justify-center mt-[20px] items-baseline paragraph hover:text-[--hover-alt]">
          <ArrowForwardIosIcon sx={{ fontSize: 12, fontWeight: 600 }} />
          {item?.attributes?.link_title}
        </span>
      </Link>
    </div>
  );
};
export default function PostSlider({ posts }) {
  return (
    <div className={"section-page py-[60px] bg-[#f3f3f3] section-post-slider"}>
      <div className={"page-container relative"}>
        <div className={"heading-1 font-bold text-center mb-[15px]"}>News</div>
        <Swiper
          className={"swiper-container post-slider w-full"}
          modules={[Pagination, Autoplay, Navigation]}
          navigation={{
            nextEl: ".post-button-next",
            prevEl: ".post-button-prev",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
          breakpoints={{
            320: {
              slidesPerGroup: 1,
              slidesPerView: 1,
            },
            768: {
              slidesPerGroup: 2,
              slidesPerView: 2,
            },
            1200: {
              slidesPerGroup: 3,
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
        >
          {posts?.data?.map((item, index) => (
            <SwiperSlide className={"swiper-slide max-h-[768px]"} key={index}>
              <CustomSlider item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={"swiper-pagination-custom mb-[35px] mx-auto text-center"}
        />
        <div
          className={"swiper-button-prev post-button-prev"}
          style={{
            "--swiper-navigation-color": "#41535d",
            "--swiper-navigation-size": "50px",
            "--swiper-navigation-sides-offset": "-50px",
          }}
        />
        <div
          className={"swiper-button-next post-button-next"}
          style={{
            "--swiper-navigation-color": "#41535d",
            "--swiper-navigation-size": "50px",
            "--swiper-navigation-sides-offset": "-50px",
          }}
        />
        <div className={"flex justify-center"}>
          <Link href={"/news"} className={"button-main button-brand"}>
            Latest News
          </Link>
        </div>
      </div>
    </div>
  );
}
