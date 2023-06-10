"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { get } from "lodash";

const CustomSlider = ({ item }) => {
  const thumbnailUrl = get(
    item,
    "attributes.thumbnail.data.attributes.url",
    ""
  );
  const thumbnailAlt = get(
    item,
    "attributes.thumbnail.data.attributes.name",
    ""
  );
  const postLink = get(item, "attributes.slug", "");
  const postExcerpt = get(item, "attributes.excerpt", "");
  const linkTitle = get(item, "attributes.link_title", "");
  return (
    <div className={"flex h-full flex-col border-none bg-none"}>
      <div className={"relative w-full pt-[56.25%] before:content-['']"}>
        <Image
          className={
            "absolute bottom-0 left-0 right-0 top-0 w-full object-cover object-center"
          }
          src={process.env.NEXT_PUBLIC_API_URL + thumbnailUrl}
          alt={thumbnailAlt}
          width={355}
          height={200}
        />
      </div>
      <Link
        className={
          "mx-[20px] flex-[1_0_auto] translate-y-[-40px] cursor-pointer bg-white px-[30px] py-[20px] text-center no-underline hover:underline"
        }
        href={"/news/" + postLink}
      >
        <p className={"paragraph mb-[1rem]"}>{postExcerpt}</p>
        <span className="link paragraph mt-[20px] flex items-baseline justify-center font-semibold hover:text-[--hover-alt]">
          <ArrowForwardIosIcon sx={{ fontSize: 12, fontWeight: 600 }} />
          {linkTitle}
        </span>
      </Link>
    </div>
  );
};
export default function PostSlider({ posts }) {
  return (
    <div className={"section-page section-post-slider bg-[#f3f3f3] py-[60px]"}>
      <div className={"page-container relative"}>
        <div className={"heading-1 mb-[15px] text-center font-bold"}>News</div>
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
          className={"swiper-pagination-custom mx-auto mb-[35px] text-center"}
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
