import Link from "next/link";
import joinClass from "@/app/lib/joinClass";
const Breadcrumbs = ({ className, innerClass, items, color }) => {
  return (
    <div className={joinClass(className, "section-page relative z-10")}>
      <div className="mx-auto w-full px-[1.25%] md:px-[20px] mh9:max-w-[960px] mh12:max-w-[1170px]">
        <div className={"flex flex-row bg-white " + innerClass}>
          <nav className={"flex-1"}>
            <ol
              className={joinClass(
                "leading-[26px]",
                "flex",
                "flex-wrap",
                "list-none",
                "py-[20px]",
                "border-b-4",
                "border-solid",
                color === "blue" && "border-[--kleemann]",
                color === "green" && "border-[--vogele]",
                color === "yellow" && "border-[--johndeer]",
                color === "orange" && "border-[--hamm]",
                color === "gray" && "border-[--color-brand]"
              )}
            >
              {items.map((crumb, i) => {
                if (i === 0) {
                  return (
                    <li
                      className={joinClass(
                        "pr-[15px] md:flex",
                        items.length > 2 && "hidden"
                      )}
                      key={i}
                    >
                      <Link
                        href={crumb.path}
                        className="text-[.9375rem] font-normal text-[#41535d] hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    </li>
                  );
                } else if (i === items.length - 1) {
                  return (
                    <li
                      className={
                        "flex pr-[15px] before:float-left before:w-[25px] before:pr-[15px] before:content-[url('/arrow-right.svg')]"
                      }
                      key={i}
                    >
                      <span
                        className={joinClass(
                          "text-[.9375rem]",
                          "font-normal",
                          color === "blue" && "text-[--kleemann]",
                          color === "green" && "text-[--vogele]",
                          color === "yellow" && "text-[--johndeer]",
                          color === "orange" && "text-[--hamm]",
                          color === "gray" && "text-[--color-brand]"
                        )}
                      >
                        {crumb.label}
                      </span>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className={
                        "flex pr-[15px] md:before:float-left md:before:w-[25px] md:before:pr-[15px] md:before:content-[url('/arrow-right.svg')]"
                      }
                      key={i}
                    >
                      <Link
                        href={crumb.path}
                        className="text-[.9375rem] font-normal text-[#41535d] hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    </li>
                  );
                }
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumbs;
