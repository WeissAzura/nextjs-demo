"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/app/news/page";
import { useForm } from "react-hook-form";
import joinClass from "@/app/lib/joinClass";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { get } from "lodash";
export async function fetchPosts({ queryKey, pageParam = 1 }) {
  const [_, watchAllCheckboxes, searchTerm] = queryKey;
  let stringUrl = "";
  let searchUrl = "";
  let loadUrl = `&pagination[page]=${pageParam}&pagination[pageSize]=3`;
  if (watchAllCheckboxes.length === 1) {
    stringUrl = `&filters[categories][slug][$eq]=${watchAllCheckboxes[0]}`;
  } else if (watchAllCheckboxes.length > 1) {
    for (let i = 0; i < watchAllCheckboxes.length; i++) {
      stringUrl += `&filters[$and][${i}][categories][slug][$eq]=${watchAllCheckboxes[i]}`;
    }
  }
  if (searchTerm) {
    searchUrl = `&filters[title][$contains]=${searchTerm}`;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?fields[0]=title&fields[1]=excerpt&fields[2]=slug&fields[3]=createdAt&fields[4]=thumbnail&fields[5]=categories&populate[1]=categories&populate[0]=thumbnail&sort=createdAt:desc${stringUrl}${searchUrl}${loadUrl}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
const Posts = ({ post, index, lastRef, last }) => {
  const inputDate = new Date(post.attributes.createdAt);
  const imageUrl = get(post, "attributes.thumbnail.data.attributes.url", "");
  const imageAlt = get(post, "attributes.thumbnail.data.attributes.name", "");
  const postTitle = get(post, "attributes.title", "");
  const postExcerpt = get(post, "attributes.excerpt", "");
  const postSlug = get(post, "attributes.slug", "");
  const dateObj = new Date(inputDate);
  const outputDate = format(dateObj, "MM/dd/yy");
  return (
    <div
      className={joinClass(
        "section-page",
        "md:pb-[40px]",
        "pb-[30px]",
        "mh9:pb-[50px]",
        "mh12:pb-[60px]"
      )}
      ref={index === last ? lastRef : null}
    >
      <div className={"page-container"}>
        <div className={"flex flex-col md:flex-row md:gap-x-[28px]"}>
          <div className={"md:max-w-[calc(1/3)] md:basis-1/3"}>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
              alt={imageAlt}
              width={355}
              height={200}
              className={"mb-[15px] w-full object-cover md:mb-0"}
            />
          </div>
          <div className={"flex flex-col md:max-w-[calc(2/3)] md:basis-2/3"}>
            <div
              className={
                "mb-[5px] text-[15px] font-semibold leading-[25px] text-[#a0a9ae] min-[992px]:mb-[10px]"
              }
            >
              {outputDate}
            </div>
            <div className={"heading-5"}>{postTitle}</div>
            <div className={"paragraph hidden md:mb-[20px] md:block"}>
              {postExcerpt}
            </div>
            <Link
              href={`/news/${postSlug}`}
              className={"button-main button-brand m-0 self-start"}
            >
              View article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FilterBar() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const processedCategories = get(categories, "data.data", []);
  const { ref: lastRef, inView } = useInView();
  const { watch, handleSubmit, register } = useForm({
    defaultValues: {
      company: [],
      search: "",
    },
  });
  const [search, setSearch] = useState("");
  const onSubmit = (data) => setSearch(data.search);
  const watchAllCheckboxes = watch("company");
  const {
    status,
    data: posts,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", watchAllCheckboxes, search],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      const currentPage = get(lastPage, "meta.pagination.page", 1);
      const totalPages = get(lastPage, "meta.pagination.pageCount", 1);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().then((r) => console.log(r.status));
    }
  }, [inView, hasNextPage, fetchNextPage]);

  let postsData;
  let group = [];

  if (status === "success") {
    let pages = get(posts, "pages", []);
    pages.map((g) => {
      group = [...group, ...g.data];
    });
    postsData =
      group.length > 0 ? (
        group.map((post, index) => (
          <Posts
            key={post.attributes.slug}
            post={post}
            last={group.length - 1}
            index={index}
            lastRef={lastRef}
          />
        ))
      ) : (
        <div className={"section-page pb-[60px]"}>
          <div className={"page-container"}>
            <div className={"heading-1"}>0 Search results</div>
            <div className={"intro"}>
              Unfortunately, your search did not return any results. Please try
              again using a different search term.
            </div>
          </div>
        </div>
      );
  }
  return (
    <>
      <div className="mb-[30px] bg-[#f3f3f3] py-[30px] mh5:py-[40px] md:mb-[40px] mh9:mb-[50px] mh12:mb-[60px]">
        <div className={"page-container"}>
          <form onSubmit={handleSubmit(onSubmit)} className={"mh5:py-[40px]"}>
            <div className={"flex flex-col gap-x-[1rem] mh9:flex-row"}>
              <div className={"max-w-full mh9:max-w-[50%] mh9:flex-[0_0_50%]"}>
                <div className={"paragraph mb-[9px] font-semibold"}>
                  Company
                </div>
                <div
                  className={
                    "flex flex-col gap-y-[1rem] mh5:flex-row mh5:flex-wrap mh5:items-center"
                  }
                >
                  {processedCategories.map((category) => {
                    let categorySlug = get(category, "attributes.slug", "");
                    let categoryName = get(category, "attributes.name", "");
                    return (
                      <div
                        key={categorySlug}
                        className={"relative w-full mh5:mt-[10px] mh5:w-1/3"}
                      >
                        <input
                          className={
                            "invisible absolute top-0 -z-10 m-0 h-[18px] w-[18px] opacity-0"
                          }
                          id={categorySlug}
                          type={"checkbox"}
                          value={categorySlug}
                          {...register("company")}
                        />
                        <label
                          className={joinClass(
                            "paragraph",
                            "font-semibold",
                            "label-input",
                            "flex items-center",
                            watchAllCheckboxes.includes(categorySlug) &&
                              "label-input-checked"
                          )}
                          htmlFor={categorySlug}
                        >
                          {categoryName}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={"max-w-full mh9:max-w-[50%] mh9:flex-[0_0_50%]"}>
                <div
                  className={"mt-[1rem] font-semibold mh5:mb-[9px] mh5:mt-0"}
                >
                  <label htmlFor={"f_search"} className={"paragraph"}>
                    Search
                  </label>
                </div>
                <div>
                  <input
                    placeholder={
                      "Search for documents, products, news articles..."
                    }
                    className={
                      "placeholder:paragraph mt-[10px] w-full border-[2px] border-solid border-[white] px-[20px] py-[14px] focus:border-[--color-brand] focus:shadow-none focus:outline-0 min-[992px]:px-[20px] min-[992px]:py-[16px]"
                    }
                    type={"text"}
                    id={"f_search"}
                    {...register("search")}
                  />
                </div>
              </div>
            </div>
            <div className={"flex items-center justify-center"}>
              <button
                type={"submit"}
                className={"button-main button-brand mt-[30px] md:mt-[40px]"}
              >
                Apply filter
              </button>
            </div>
          </form>
        </div>
      </div>
      {postsData}
    </>
  );
}
