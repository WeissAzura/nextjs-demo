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
  const inputDate = new Date(post?.attributes?.createdAt);
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
          <div className={"md:basis-1/3 md:max-w-[calc(1/3)]"}>
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL +
                post?.attributes?.thumbnail?.data?.attributes?.url
              }
              alt={post?.attributes?.thumbnail?.data?.attributes?.name}
              width={355}
              height={200}
              className={"w-full object-cover mb-[15px] md:mb-0"}
            />
          </div>
          <div className={"md:basis-2/3 md:max-w-[calc(2/3)] flex flex-col"}>
            <div
              className={
                "mb-[5px] text-[15px] leading-[25px] font-semibold text-[#a0a9ae] min-[992px]:mb-[10px]"
              }
            >
              {outputDate}
            </div>
            <div className={"heading-5"}>{post?.attributes?.title}</div>
            <div className={"paragraph md:mb-[20px] md:block hidden"}>
              {post?.attributes?.excerpt}
            </div>
            <Link
              href={`/news/${post?.attributes?.slug}`}
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
      return lastPage?.meta?.pagination?.page <
        lastPage?.meta?.pagination?.pageCount
        ? lastPage?.meta?.pagination?.page + 1
        : undefined;
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
    posts.pages?.map((g) => {
      group = [...group, ...g.data];
    });
    postsData =
      group.length > 0 ? (
        group?.map((post, index) => (
          <Posts
            key={post?.attributes?.slug}
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
      <div className="mh5:py-[40px] py-[30px] bg-[#f3f3f3] md:mb-[40px] mb-[30px] mh9:mb-[50px] mh12:mb-[60px]">
        <div className={"page-container"}>
          <form onSubmit={handleSubmit(onSubmit)} className={"mh5:py-[40px]"}>
            <div className={"flex gap-x-[1rem] flex-col mh9:flex-row"}>
              <div className={"max-w-full mh9:max-w-[50%] mh9:flex-[0_0_50%]"}>
                <div className={"mb-[9px] font-semibold paragraph"}>
                  Company
                </div>
                <div
                  className={
                    "flex flex-col mh5:flex-row mh5:items-center mh5:flex-wrap gap-y-[1rem]"
                  }
                >
                  {categories.data?.data?.map((category) => (
                    <div
                      key={category?.attributes?.slug}
                      className={"w-full mh5:w-1/3 relative mh5:mt-[10px]"}
                    >
                      <input
                        className={
                          "invisible opacity-0 -z-10 absolute top-0 w-[18px] h-[18px] m-0"
                        }
                        id={category?.attributes?.slug}
                        type={"checkbox"}
                        value={category?.attributes?.slug}
                        {...register("company")}
                      />
                      <label
                        className={joinClass(
                          "paragraph",
                          "font-semibold",
                          "label-input",
                          "flex items-center",
                          watchAllCheckboxes.includes(
                            category?.attributes?.slug
                          ) && "label-input-checked"
                        )}
                        htmlFor={category?.attributes?.slug}
                      >
                        {category?.attributes?.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={"max-w-full mh9:max-w-[50%] mh9:flex-[0_0_50%]"}>
                <div
                  className={"mt-[1rem] mh5:mt-0 mh5:mb-[9px] font-semibold"}
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
                      "mt-[10px] w-full py-[14px] px-[20px] min-[992px]:py-[16px] border-[2px] border-[white] border-solid min-[992px]:px-[20px] placeholder:paragraph focus:border-[--color-brand] focus:outline-0 focus:shadow-none"
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
