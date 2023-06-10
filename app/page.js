import HomeSlider from "@/app/components/home_slider";
import Breadcrumbs from "@/app/components/breadcrumbs";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import PostSlider from "@/app/components/posts_slider";
import Videos from "@/app/components/videos_list";
import Link from "next/link";
import joinClass from "@/app/lib/joinClass";
import { get } from "lodash";
export const metadata = {
  title: "Home | Wirtgen Group in USA and Canada",
  description:
    "Discover the world of the international Wirtgen Group with its leading technology product brands Wirtgen, Vögele, Hamm and Kleemann.",
};
async function fetchSlider() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate=top_slider.image&fields[0]=top_slider`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchHeading() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?fields[0]=title&fields[1]=content`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchProduct() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate=brand_product.icon&fields[0]=brand_product`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchPost() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*&fields[0]=thumbnail&fields[1]=link_title&fields[2]=excerpt&sort=createdAt:desc&pagination[limit]=6&fields[3]=slug`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchService() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate[0]=services.left_image&fields[0]=services&populate[1]=services.right_image`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchCareer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate[0]=career.left_image&fields[0]=career&populate[1]=career.right_image`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchVideo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate[0]=videos.video&fields[0]=videos&populate[1]=videos.thumbnail`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function fetchRows() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?populate=info_rows.image&fields[0]=info_rows`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const Heading = ({ heading }) => {
  const headingTitle = get(heading, "data.attributes.title", "");
  const headingContent = get(heading, "data.attributes.content", "");
  return (
    <div
      className={
        "section-page py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"
      }
    >
      <div className={"page-container"}>
        <ReactMarkdown
          className={
            "heading-1 brand-color-text whitespace-pre-wrap text-center"
          }
        >
          {headingTitle}
        </ReactMarkdown>
        <ReactMarkdown
          className={
            "brand-color-text whitespace-pre-wrap text-center text-[18px] leading-[30px]"
          }
        >
          {headingContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};
const Product = ({ products }) => {
  const processedProducts = get(products, "data.attributes.brand_product", []);
  return (
    <div className={"section-page pb-[60px]"}>
      <div className={"page-container"}>
        <div className={"flex flex-wrap"}>
          {processedProducts.map((item, index) => {
            let url = get(item, "icon.data.attributes.url", "");
            let alt = get(item, "icon.data.attributes.name", "");
            let title = get(item, "title", "");
            return (
              <div className={"flex-auto basis-1/2 md:basis-0"} key={index}>
                <Image
                  className={"m-auto h-auto w-auto"}
                  src={process.env.NEXT_PUBLIC_API_URL + url}
                  alt={alt}
                  width={0}
                  height={0}
                />
                <div
                  className={
                    "brand-color-text mt-[5px] text-center font-semibold uppercase"
                  }
                >
                  {title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Service = ({ services }) => {
  const processedServices = get(services, "data.attributes.services", []);
  const list = processedServices.map((item, index) => (
    <div
      key={index}
      className={
        "section-page pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"
      }
    >
      <Item item={item} />
    </div>
  ));
  return <>{list}</>;
};
const Item = ({ item }) => {
  const title = get(item, "Title", "");
  const leftUrl = get(item, "left_image.data.attributes.url", "");
  const leftAlt = get(item, "left_image.data.attributes.name", "");
  const leftTitle = get(item, "left_title", "");
  const leftContent = get(item, "left_content", "");
  const rightUrl = get(item, "right_image.data.attributes.url", "");
  const rightAlt = get(item, "right_image.data.attributes.name", "");
  const rightTitle = get(item, "right_title", "");
  const rightContent = get(item, "right_content", "");
  return (
    <div className={"page-container"}>
      <div className={"ml-[-20px] mr-[-20px] flex flex-wrap justify-center"}>
        <div
          className={
            "flex-3-cols heading-2 brand-color-text mb-[10px] font-bold"
          }
        >
          {title}
        </div>
        <div className={"flex-3-cols flex flex-col"}>
          {leftUrl && (
            <Image
              className={"mb-4 w-full"}
              src={process.env.NEXT_PUBLIC_API_URL + leftUrl}
              alt={leftAlt}
              width={360}
              height={203}
            />
          )}
          {leftTitle && (
            <div
              className={
                "brand-color-text mb-4 text-[18px] font-semibold leading-[30px]"
              }
            >
              {leftTitle}
            </div>
          )}
          <ReactMarkdown
            className={"brand-color-text row-title paragraph mb-4"}
          >
            {leftContent}
          </ReactMarkdown>
        </div>
        <div className={"flex-3-cols flex flex-col"}>
          {rightUrl && (
            <Image
              className={"mb-4 w-full"}
              src={process.env.NEXT_PUBLIC_API_URL + rightUrl}
              alt={rightAlt}
              width={360}
              height={203}
            />
          )}
          {rightTitle && (
            <div
              className={
                "brand-color-text mb-4 text-[18px] font-semibold leading-[30px]"
              }
            >
              {rightTitle}
            </div>
          )}

          <ReactMarkdown
            className={"brand-color-text row-title paragraph mb-4"}
          >
            {rightContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
const Career = ({ career }) => {
  const processedCareer = get(career, "data.attributes.career", []);
  return (
    <div
      className={
        "section-page py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"
      }
    >
      <Item item={processedCareer} />
    </div>
  );
};

export const InfoRow = ({ rows, reverse }) => {
  const list = rows.map((item, index) => {
    const url = get(item, "image.data.attributes.url", "");
    const title = get(item, "title", "");
    const content = get(item, "content", "");
    const buttonLink = get(item, "button_link", "");
    const buttonText = get(item, "button_text", "");
    return (
      <div
        key={index}
        className={
          "section-page pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"
        }
      >
        <div className={"mx-auto w-full"}>
          <div
            className={joinClass(
              !reverse && index % 2 !== 0 ? "mh9:flex-row-reverse" : "",
              reverse && index % 2 === 0 ? "mh9:flex-row-reverse" : "",
              "flex flex-col mh9:flex-row"
            )}
          >
            <div
              style={{
                backgroundImage: `url(${
                  process.env.NEXT_PUBLIC_API_URL + url
                })`,
              }}
              className={
                "h-auto bg-cover bg-center bg-no-repeat before:block before:w-full before:pt-[50%] before:content-[''] mh9:max-w-[calc(50%+85px)] mh9:flex-[0_0_55%]"
              }
            />
            <div
              className={joinClass(
                "mh12:py-[80px]",
                "mh12:px-[100px]",
                "mh9:py-[60px]",
                "mh9:px-[80px]",
                "mh5:py-[30px]",
                "mh5:px-[50px]",
                "text-center",
                "mh5:text-left",
                "py-[20px]",
                "px-[20px]",
                "mh12:max-w-[calc(50%+85px-135px)]",
                "mh9:max-w-[calc(50%)]",
                "mh9:my-[50px]",
                "bg-[#f3f3f3]",
                "mh5:mx-[43px]",
                "md:mx-[33px]",
                "mh5:my-0",
                "mx-0",
                "mx-[24px]",
                "mh9:flex-[0_0_100%]",
                "translate-y-[-50px]",
                "mh9:translate-y-0",
                !reverse && index % 2 !== 0
                  ? "mh9:translate-x-[140px] mh12:translate-x-[170px]"
                  : "mh9:translate-x-[-140px] mh12:translate-x-[-170px]",
                reverse && index % 2 === 0
                  ? "mh9:translate-x-[140px] mh12:translate-x-[170px]"
                  : "mh9:translate-x-[-140px] mh12:translate-x-[-170px]"
              )}
            >
              <div className={"heading-2 mb-[15px] font-bold"}>{title}</div>
              <ReactMarkdown
                className={
                  "paragraph info-row-content mb-[30px] whitespace-pre-wrap"
                }
              >
                {content}
              </ReactMarkdown>
              {buttonLink && buttonText && (
                <a href={buttonLink} className={"button-main button-brand"}>
                  {buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{list}</>;
};
const Contact = () => {
  return (
    <div
      className={
        "section-page pt-[30px] md:pt-[40px] mh9:pt-[50px] mh12:pt-[60px]"
      }
    >
      <div
        className={
          "relative flex justify-center bg-[url('/contact.jpg')] bg-cover bg-center bg-no-repeat"
        }
      >
        <div
          className={
            "absolute bottom-0 left-0 right-0 top-0 bg-white opacity-50"
          }
        />
        <div className={"z-10 flex flex-col items-center py-[80px]"}>
          <div className={"heading-2 mb-[15px] pb-[80px] font-bold"}>
            Please feel free to contact us!
          </div>
          <Link
            href={"/customer-support"}
            className={"button-main button-brand"}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};
export default async function Home() {
  const slidersData = fetchSlider();
  const servicesData = fetchService();
  const productsData = fetchProduct();
  const headingData = fetchHeading();
  const postsData = fetchPost();
  const careerData = fetchCareer();
  const videosData = fetchVideo();
  const rowsData = fetchRows();
  const [sliders, heading, products, services, posts, career, videos, rows] =
    await Promise.all([
      slidersData,
      headingData,
      productsData,
      servicesData,
      postsData,
      careerData,
      videosData,
      rowsData,
    ]);
  const processedRows = get(rows, "data.attributes.info_rows", []);
  return (
    <>
      <HomeSlider sliders={sliders} />
      <Breadcrumbs
        className={"mh9:-translate-y-[15%]"}
        items={[{ label: "Home", path: "/" }]}
        color={"gray"}
        innerClass={
          "md:after:content-[''] md:after:mx-[30px] md:before:content-[''] md:before:mx-[30px]"
        }
      />
      <Heading heading={heading} />
      <Product products={products} />
      <Service services={services} />
      <PostSlider posts={posts} />
      <Career career={career} />
      <Videos videos={videos} />
      <InfoRow rows={processedRows} reverse={false} />
      <Contact />
    </>
  );
}
