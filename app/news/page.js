import Breadcrumbs from "@/app/components/breadcrumbs";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import FilterBar from "@/app/components/news-filter";

export async function fetchCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?fields[0]=name&fields[1]=slug`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function fetchHeading() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post?fields[0]=title&fields[1]=content`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function NewsHeading({ heading }) {
  return (
    <div className={"py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"}>
      <div className={"page-container"}>
        <div
          className={
            "mx-auto text-center mh5:max-w-[83.33333333%] mh12:max-w-[66.66666667%]"
          }
        >
          <h2 className={"heading-1 font-bold"}>
            {heading?.data?.attributes?.title}
          </h2>
          <div className={"intro"}>{heading?.data?.attributes?.content}</div>
        </div>
      </div>
    </div>
  );
}
export default async function News() {
  const queryClient = getQueryClient();
  const headingData = fetchHeading();
  const categoriesData = queryClient.prefetchQuery(
    ["categories"],
    fetchCategories
  );
  const [heading, categories] = await Promise.all([
    headingData,
    categoriesData,
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <Breadcrumbs
        color={"gray"}
        items={[
          { label: "Home", path: "/" },
          { label: "News", path: "/news" },
        ]}
      />
      <NewsHeading heading={heading} />
      <FilterBar />
    </Hydrate>
  );
}
