"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import Image from "next/image";
export const CustomSlide = ({ item }) => {
  const [open, setOpen] = useState(false);
  if (item?.video)
    return (
      <>
        <div
          className={"relative cursor-pointer"}
          onClick={() => {
            if (item?.video) {
              setOpen(true);
            }
          }}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL +
              item?.thumbnail?.data?.attributes?.url
            }
            alt={item?.thumbnail?.data?.attributes?.name}
            width={1680}
            height={945}
          />
          <button
            type={"button"}
            title={"Play Video"}
            className={
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }
          >
            <Image
              src={"/playbutton.svg"}
              alt={"play button"}
              width={80}
              height={80}
            />
          </button>
        </div>

        <Lightbox
          open={open}
          carousel={{ finite: true }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
            slide: ({ slide }) =>
              slide.type === "custom" ? (
                <Plyr
                  options={{
                    autoplay: true,
                  }}
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: slide?.sourceVideo,
                        type: "video/mp4",
                        size: 1080,
                      },
                    ],
                  }}
                />
              ) : undefined,
          }}
          close={() => setOpen(false)}
          slides={[
            {
              type: "custom",
              sourceVideo:
                process.env.NEXT_PUBLIC_API_URL +
                item?.video?.data?.attributes?.url,
            },
          ]}
        />
      </>
    );
};
export default function Videos({ videos }) {
  const list = videos?.data?.attributes?.videos?.map((item, index) => (
    <div
      className={
        "section-page pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"
      }
      key={index}
    >
      <div className={"page-container"}>
        <div
          className={
            "heading-1 py-[30px] text-center font-bold md:py-[40px] mh9:py-[50px] mh12:py-[60px]"
          }
        >
          {item?.title}
        </div>
        <CustomSlide item={item} />
      </div>
    </div>
  ));
  return <>{list}</>;
}
