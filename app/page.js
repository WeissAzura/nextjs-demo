import HomeSlider from "@/app/components/home_slider";
import Breadcrumbs from "@/app/components/breadcrumbs";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import PostSlider from "@/app/components/posts_slider";
import Videos from "@/app/components/videos_list";
import Link from "next/link";
import joinClass from "@/app/lib/joinClass";

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
          {heading?.data?.attributes?.title}
        </ReactMarkdown>
        <ReactMarkdown
          className={
            "brand-color-text whitespace-pre-wrap text-center text-[18px] leading-[30px]"
          }
        >
          {heading?.data?.attributes?.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
const Product = ({ products }) => {
  return (
    <div className={"section-page pb-[60px]"}>
      <div className={"page-container"}>
        <div className={"flex flex-wrap"}>
          {products?.data?.attributes?.brand_product?.map((item, index) => (
            <div className={"flex-auto basis-1/2 md:basis-0"} key={index}>
              <Image
                className={"m-auto h-auto w-auto"}
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  item?.icon?.data?.attributes?.url
                }
                alt={item?.icon?.data?.attributes?.name}
                width={0}
                height={0}
              />
              <div
                className={
                  "brand-color-text mt-[5px] text-center font-semibold uppercase"
                }
              >
                {item?.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Service = ({ services }) => {
  const list = services?.data?.attributes?.services?.map((item, index) => (
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
  return (
    <div className={"page-container"}>
      <div className={"ml-[-20px] mr-[-20px] flex flex-wrap justify-center"}>
        <div
          className={
            "flex-3-cols heading-2 brand-color-text mb-[10px] font-bold"
          }
        >
          {item?.Title}
        </div>
        <div className={"flex-3-cols flex flex-col"}>
          {item?.left_image?.data?.attributes?.url && (
            <Image
              className={"mb-4 w-full"}
              src={
                process.env.NEXT_PUBLIC_API_URL +
                item?.left_image?.data?.attributes?.url
              }
              alt={item?.left_image?.data?.attributes?.name}
              width={360}
              height={203}
            />
          )}
          {item?.left_title && (
            <div
              className={
                "brand-color-text mb-4 text-[18px] font-semibold leading-[30px]"
              }
            >
              {item?.left_title}
            </div>
          )}
          <ReactMarkdown
            className={"brand-color-text row-title paragraph mb-4"}
          >
            {item?.left_content}
          </ReactMarkdown>
        </div>
        <div className={"flex-3-cols flex flex-col"}>
          {item?.right_image?.data?.attributes?.url && (
            <Image
              className={"mb-4 w-full"}
              src={
                process.env.NEXT_PUBLIC_API_URL +
                item?.right_image?.data?.attributes?.url
              }
              alt={item?.right_image?.data?.attributes?.name}
              width={360}
              height={203}
            />
          )}
          {item?.right_title && (
            <div
              className={
                "brand-color-text mb-4 text-[18px] font-semibold leading-[30px]"
              }
            >
              {item?.right_title}
            </div>
          )}

          <ReactMarkdown
            className={"brand-color-text row-title paragraph mb-4"}
          >
            {item?.right_content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
const Career = ({ career }) => {
  const item = career?.data?.attributes?.career;
  return (
    <div
      className={
        "section-page py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"
      }
    >
      <Item item={item} />
    </div>
  );
};

export const InfoRow = ({ rows, reverse }) => {
  const list = rows?.map((item, index) => (
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
                process.env.NEXT_PUBLIC_API_URL +
                item?.image?.data?.attributes?.url
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
            <div className={"heading-2 mb-[15px] font-bold"}>{item?.title}</div>
            <ReactMarkdown
              className={
                "paragraph info-row-content mb-[30px] whitespace-pre-wrap"
              }
            >
              {item?.content}
            </ReactMarkdown>
            {item?.button_link && item?.button_text && (
              <a
                href={item?.button_link}
                className={"button-main button-brand"}
              >
                {item?.button_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
  return <>{list}</>;
};
const Contact = () => {
  return (
    <div
      className={
        "section-page pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"
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
      <InfoRow rows={rows?.data?.attributes?.info_rows} reverse={false} />
      <Contact />
    </>
  );
}
