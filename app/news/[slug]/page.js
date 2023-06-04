import Breadcrumbs from "@/app/components/breadcrumbs";
import ReactMarkdown from "react-markdown";
import joinClass from "@/app/lib/joinClass";
import Contact from "@/app/components/contact_section";
import { NavigationBar } from "@/app/components/navigation_bar";
import Slider from "@/app/components/news_slider";
import { CustomSlide } from "@/app/components/videos_list";

async function fetchInfo({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=deep,3&filters[slug][$eq]=${params.slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const DynamicZone = ({ data, color }) => {
  return data?.map((item, index) => {
    if (item?.__component === "shared.navigation-bar") {
      return <NavigationBar item={item} color={color} key={index} />;
    } else if (item?.__component === "shared.content-row") {
      return (
        <div
          key={index}
          className={joinClass(
            "section-page py-[30px] md:py-[40px] min-[1200px]:py-[60px]"
          )}
        >
          <div className={"page-container"}>
            <div
              className={
                "mx-auto mh5:max-w-[83.33333333%] mh12:max-w-[66.66666667%]"
              }
            >
              <ReactMarkdown className={"paragraph whitespace-pre-wrap"}>
                {item?.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    } else if (item?.__component === "shared.download-row") {
      return (
        <div
          id={"download-section"}
          key={index}
          className={joinClass(
            "section-page bg-[#f3f3f3] py-[30px] md:py-[40px] min-[1200px]:py-[60px]"
          )}
        >
          <div className={"page-container"}>
            <div className={"bg-white mh9:max-w-[50%]"}>
              <div className={"px-[60px] py-[40px]"}>
                <div className={"heading-2 font-bold"}>{item?.title}</div>
                <p className={"paragraph mb-[20px] md:mb-[30px]"}>
                  {item?.content}
                </p>
                <a
                  className={joinClass(
                    "button-main",
                    color === "blue" &&
                      "border-[--kleemann] bg-[--kleemann] text-white",
                    color === "green" &&
                      "border-[--vogele] bg-[--vogele] text-white",
                    color === "yellow" &&
                      "border-[--johndeer] bg-[--johndeer] text-[--color-brand]",
                    color === "orange" &&
                      "border-[--hamm] bg-[--hamm] text-white",
                    color === "gray" &&
                      "border-[--color-brand] bg-[--color-brand] text-white"
                  )}
                  href={
                    process.env.NEXT_PUBLIC_API_URL +
                    item?.download?.data?.attributes?.url
                  }
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (item?.__component === "shared.article-video") {
      return (
        <div className={"section-page"} key={index}>
          <div className={"page-container"}>
            <CustomSlide item={item} />
          </div>
        </div>
      );
    }
  });
};

export default async function Post({ params }) {
  const InfoData = fetchInfo({ params });
  const [info] = await Promise.all([InfoData]);

  return (
    <>
      <Breadcrumbs
        color={info?.data[0]?.attributes?.color}
        items={[
          { label: "Home", path: "/" },
          { label: "News", path: "/news" },
          {
            label: info?.data[0]?.attributes?.link_title,
            path: `/news/${info?.data[0]?.attributes?.slug}`,
          },
        ]}
      />
      <div
        className={joinClass(
          "section-page py-[30px] md:py-[40px] min-[1200px]:py-[60px]"
        )}
      >
        <div className={"page-container"}>
          <div
            className={
              "mx-auto mh5:max-w-[83.33333333%] mh12:max-w-[66.66666667%]"
            }
          >
            <h1 className={"heading-1 text-center font-bold"}>
              {info?.data[0]?.attributes?.title}
            </h1>
            <ReactMarkdown className={"paragraph whitespace-pre-wrap"}>
              {info?.data[0]?.attributes?.heading_content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      {info?.data[0]?.attributes?.article_content.length > 0 && (
        <DynamicZone
          color={info?.data[0]?.attributes?.color}
          data={info?.data[0]?.attributes?.article_content}
        />
      )}
      {info?.data[0]?.attributes?.slider_1.length > 0 && (
        <Slider
          data={info?.data[0]?.attributes?.slider_1}
          mainColor={info?.data[0]?.attributes?.color}
        />
      )}
      {info?.data[0]?.attributes?.bottom_section.length > 0 && (
        <DynamicZone
          data={info?.data[0]?.attributes?.bottom_section}
          color={info?.data[0]?.attributes?.color}
        />
      )}
      <Contact
        color={info?.data[0]?.attributes?.color}
        data={info?.data[0]?.attributes?.contact}
      />
    </>
  );
}
