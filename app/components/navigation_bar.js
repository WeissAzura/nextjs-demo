"use client";
import { useEffect, useRef, useState } from "react";
import joinClass from "@/app/lib/joinClass";
import { get } from "lodash";

const useSticky = (element) => {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.querySelector("#navigation-bar")?.getBoundingClientRect()
          .top === -1
          ? setSticky(!entry.isIntersecting)
          : setSticky(false);
      },
      {
        threshold: 1,
      }
    );
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [element]);
  return isSticky;
};

export function NavigationBar({ item, color }) {
  const elementRef = useRef(null);
  const isSticky = useSticky(elementRef);
  const downloadTitle = get(item, "download_title", "");
  const contactTitle = get(item, "contact_title", "");
  return (
    <div
      ref={elementRef}
      className={joinClass("section-page sticky top-[-1px] z-[9999]")}
      id={"navigation-bar"}
    >
      <div
        className={joinClass(
          isSticky ? "max-w-full p-0" : "page-container",
          "transition-[max-width] duration-[250ms]"
        )}
      >
        <nav
          className={joinClass(
            "flex h-auto flex-col items-center gap-x-[10px] transition-[border-radius] duration-[250ms] ease-linear md:h-[50px] md:flex-row md:px-[50px]",
            isSticky ? "justify-center rounded-none" : "md:rounded-[25px]",
            color === "blue" && "bg-[--kleemann]",
            color === "green" && "bg-[--vogele]",
            color === "yellow" && "bg-[--johndeer]",
            color === "orange" && "bg-[--hamm]",
            color === "gray" && "bg-[--color-brand]"
          )}
        >
          <a
            className={joinClass(
              "paragraph w-full border-b border-solid border-white text-center font-semibold md:w-auto md:border-none md:p-[0.5rem]",
              color === "yellow" ? "text-[--color-brand]" : "text-white"
            )}
            href={"#download-section"}
          >
            {downloadTitle}
          </a>
          <a
            className={joinClass(
              "paragraph font-semibold md:p-[0.5rem]",
              color === "yellow" ? "text-[--color-brand]" : "text-white"
            )}
            href={"#contact-section"}
          >
            {contactTitle}
          </a>
        </nav>
      </div>
    </div>
  );
}
