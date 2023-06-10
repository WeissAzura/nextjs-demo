import Breadcrumbs from "@/app/components/breadcrumbs";
import ReactMarkdown from "react-markdown";
import joinClass from "@/app/lib/joinClass";
import Contact from "@/app/components/contact_section";
import { NavigationBar } from "@/app/components/navigation_bar";
import Slider from "@/app/components/news_slider";
import { CustomVideo } from "@/app/components/videos_list";
import { head, get } from "lodash";

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
  return data.map((item, index) => {
    if (item.__component === "shared.navigation-bar") {
      return <NavigationBar item={item} color={color} key={index} />;
    } else if (item.__component === "shared.content-row") {
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
    } else if (item.__component === "shared.download-row") {
      const url = get(item, "download.data.attributes.url", "");
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
                  href={process.env.NEXT_PUBLIC_API_URL + url}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (item.__component === "shared.article-video") {
      return (
        <div className={"section-page"} key={index}>
          <div className={"page-container"}>
            <CustomVideo item={item} />
          </div>
        </div>
      );
    }
  });
};

export default async function Post({ params }) {
  const InfoData = fetchInfo({ params });
  const [info] = await Promise.all([InfoData]);
  const processedData = head(info?.data);
  const color = get(processedData, "attributes.color", "");
  const linkTitle = get(processedData, "attributes.link_title", "");
  const slug = get(processedData, "attributes.slug", "");
  const title = get(processedData, "attributes.title", "");
  const headingContent = get(processedData, "attributes.heading_content", "");
  const articleContent = get(processedData, "attributes.article_content", []);
  const slider = get(processedData, "attributes.slider_1", []);
  const bottomSection = get(processedData, "attributes.bottom_section", []);
  const contact = get(processedData, "attributes.contact", {});
  return (
    <>
      <Breadcrumbs
        color={color}
        items={[
          { label: "Home", path: "/" },
          { label: "News", path: "/news" },
          {
            label: linkTitle,
            path: `/news/${slug}`,
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
            <h1 className={"heading-1 text-center font-bold"}>{title}</h1>
            <ReactMarkdown className={"paragraph whitespace-pre-wrap"}>
              {headingContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      {articleContent.length > 0 && (
        <DynamicZone color={color} data={articleContent} />
      )}
      {slider.length > 0 && <Slider data={slider} mainColor={color} />}
      {bottomSection.length > 0 && (
        <DynamicZone data={bottomSection} color={color} />
      )}
      <Contact color={color} data={contact} />
    </>
  );
}
