"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import joinClass from "@/app/lib/joinClass";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { get } from "lodash";

export default function Contact({ color, data }) {
  const [toggle, setToggle] = useState(false);
  const accordion = useRef(null);
  const [toggleHour, setToggleHour] = useState(false);
  const accordionHour = useRef(null);
  const hourStart = get(data, "start_hour")?.split(/[:.]/);
  const hourEnd = get(data, "end_hour")?.split(/[:.]/);
  const imageUrl = get(data, "image.data.attributes.url", "");
  const imageAlt = get(data, "image.data.attributes.name", "");
  const title = get(data, "title", "");
  const leftText = get(data, "left_text", "");
  const normalContact = get(data, "normal_contact", "");
  const hotline = get(data, "hotline", []);
  const email = get(data, "email", "");
  const link = get(data, "link", "");
  const workdayStart = get(data, "workday_start", "");
  const workdayEnd = get(data, "workday_end", "");
  const timezone = get(data, "timezone", "");
  const start = hourStart
    ? format(
        new Date(Date.now()).setHours(
          parseInt(hourStart[0]),
          parseInt(hourStart[1]),
          parseInt(hourStart[2]),
          parseInt(hourStart[3])
        ),
        "h:mm a"
      )
    : "";
  const end = hourEnd
    ? format(
        new Date(Date.now()).setHours(
          parseInt(hourEnd[0]),
          parseInt(hourEnd[1]),
          parseInt(hourEnd[2]),
          parseInt(hourEnd[3])
        ),
        "h:mm a"
      )
    : "";

  return (
    <div
      id={"contact-section"}
      className={
        "section-page py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"
      }
      style={{
        "--contact-color":
          color === "blue"
            ? "var(--kleemann)"
            : color === "green"
            ? "var(--vogele)"
            : color === "yellow"
            ? "var(--johndeer)"
            : color === "orange"
            ? "var(--hamm)"
            : color === "gray" && "var(--color-brand)",
      }}
    >
      <div className={"page-container"}>
        <div
          className={
            "flex flex-col md:flex-row md:gap-x-[20px] mh9:gap-x-[115px]"
          }
        >
          <div className={"md:max-w-[41.66666667%] mh9:max-w-[33.33333333%]"}>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
              width={768}
              height={432}
              alt={imageAlt}
              className={"aspect-video w-full object-contain"}
            />
          </div>
          <div
            className={
              "flex-1 md:max-w-[58.33333333%] mh9:max-w-[66.66666666%]"
            }
          >
            <div className={"heading-2 pt-[25px] font-bold md:pt-0"}>
              {title}
            </div>
            <div className="flex flex-col border-b-[1px] border-solid border-[rgba(0,0,0,.125)] md:py-[20px] mh9:mb-0 mh9:flex-row">
              <a href="#map-section" className="mb-[20px] basis-1/2">
                <ReactMarkdown
                  className={"intro whitespace-pre-wrap font-medium "}
                >
                  {leftText}
                </ReactMarkdown>
              </a>
              {start && end && (
                <div className="basis-1/2 border-t-[1px] border-solid border-[rgba(0,0,0,.125)] md:border-none">
                  <span
                    className={joinClass(
                      "mb-[15px] hidden font-semibold tracking-[-.02em] mh5:text-[18px] mh5:leading-[27px] md:block md:text-[19px] md:leading-[28px] mh9:text-[20px] mh9:leading-[29px]"
                    )}
                  >
                    Business hours
                  </span>
                  <div
                    onClick={() => setToggleHour(!toggleHour)}
                    className={joinClass(
                      "flex basis-1/2 items-center justify-between pt-[20px] md:hidden"
                    )}
                  >
                    <span
                      className={joinClass(
                        "text-[16px] font-bold leading-[24px] tracking-[-.02em]"
                      )}
                    >
                      Business hours
                    </span>
                    <svg
                      className={joinClass(
                        "mr-[10px] h-[14px] w-[14px] transition-[transform] duration-[300ms] ease-in-out",
                        toggleHour && "rotate-180"
                      )}
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M40.962 10.958l4.561 4.561-21.524 21.524L2.475 15.519l4.561-4.561L23.998 27.92z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    ref={accordionHour}
                    className={joinClass(
                      "max-h-0 flex-col overflow-hidden pt-[20px] transition-[max-height] duration-[250ms] ease-out md:flex md:max-h-none md:pt-0 "
                    )}
                    style={{
                      maxHeight:
                        toggleHour && accordionHour.current.scrollHeight,
                    }}
                  >
                    <div className="paragraph font-medium">
                      {workdayStart} - {workdayEnd}
                    </div>
                    <div className="paragraph mb-[20px] font-medium">
                      {start} - {end} {timezone}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                "flex flex-col gap-y-[20px] pt-[20px] md:gap-0 mh12:flex-row mh12:items-center"
              }
            >
              <div className="mh12:basis-1/2">
                <div
                  onClick={() => setToggle(!toggle)}
                  className={joinClass(
                    "flex items-center justify-between md:hidden"
                  )}
                >
                  <span
                    className={joinClass(
                      "text-[16px] font-bold leading-[24px] tracking-[-.02em]"
                    )}
                  >
                    Contact Details
                  </span>
                  <svg
                    className={joinClass(
                      "mr-[10px] h-[14px] w-[14px] transition-[transform] duration-[300ms] ease-in-out",
                      toggle && "rotate-180"
                    )}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M40.962 10.958l4.561 4.561-21.524 21.524L2.475 15.519l4.561-4.561L23.998 27.92z"
                    ></path>
                  </svg>
                </div>
                <div
                  ref={accordion}
                  className={joinClass(
                    "flex max-h-0 flex-col gap-y-[15px] overflow-hidden border-b-[1px] border-solid border-[rgba(0,0,0,.125)] pt-[20px] transition-[max-height] duration-[250ms] ease-out md:max-h-none md:border-none"
                  )}
                  style={{
                    maxHeight: toggle && accordion.current.scrollHeight,
                  }}
                >
                  {normalContact && (
                    <a
                      className={"flex items-center gap-x-[10px]"}
                      href={`tel:${normalContact}`}
                    >
                      <svg
                        className={
                          "h-[20px] w-[20px] mh5:h-[28px] mh5:w-[28px]"
                        }
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill={"var(--contact-color)"}
                          d="M14.53 20.298a24.95 24.95 0 004.609 6.52 30.986 30.986 0 006.965 5.781c.571.336 1.155.634 1.791.953.893.512 2.032.322 2.694-.435a208 208 0 001.89-1.87c.357-.356.714-.713 1.073-1.068l.061-.061c.117-.117.231-.232.38-.355a1.4 1.4 0 011.065-.405c.37.022.709.185.97.476.757.733 1.501 1.477 2.248 2.224l1.477 1.472c.566.562 1.152 1.142 1.703 1.734l.051.048c.556.55.559 1.448-.013 2.025a4.315 4.315 0 01-.326.365l-.93.943c-.639.645-1.277 1.29-1.905 1.945a4.49 4.49 0 01-3.216 1.371l-.263-.029a14.28 14.28 0 01-4.272-.895 39.672 39.672 0 01-15.824-10.874 40.332 40.332 0 01-6.269-9.068 24.333 24.333 0 01-2.146-5.893 6.71 6.71 0 01.038-3.878 5.243 5.243 0 011.061-1.581c.672-.731 1.356-1.398 2.081-2.102.291-.283.587-.571.887-.868.463-.459.885-.688 1.308-.688s.847.229 1.315.687l4.879 4.878c.122.127.244.253.381.412a1.308 1.308 0 01-.05 1.926c-.918.969-1.899 1.918-2.848 2.836l-.254.247c-1.107 1.071-1.25 1.823-.612 3.227zm29.326 13.084a161.15 161.15 0 00-6.065-6.058 4.01 4.01 0 00-4.365-.771 6.486 6.486 0 00-2.306 1.717l-2.319 2.334A29.747 29.747 0 0117.32 19.215l.04-.034c.063-.054.115-.098.174-.154.338-.345.68-.685 1.023-1.024.697-.69 1.417-1.404 2.075-2.148a4.193 4.193 0 000-5.7A115.481 115.481 0 0014.89 4.38c-1.949-1.807-4.242-1.838-6.293-.085-.975.841-1.884 1.783-2.763 2.694-.267.277-.534.553-.806.83a7.283 7.283 0 00-2.01 5.572 17.932 17.932 0 001.306 5.917c1.798 4.747 4.688 9.237 8.838 13.724a42.962 42.962 0 0010.617 8.275 30.031 30.031 0 008.099 3.301c.524.111 1.059.195 1.576.275l.719.114.025.004 1.664-.023.089-.016c.083-.029.168-.054.217-.068a6.52 6.52 0 003.766-1.674c1.163-1.116 2.672-2.602 4.034-4.198a4.206 4.206 0 00-.114-5.64z"
                        ></path>
                      </svg>
                      <span className={"paragraph font-medium"}>
                        {normalContact}
                      </span>
                    </a>
                  )}
                  {hotline.length > 0 && (
                    <div className="flex items-center gap-x-[10px]">
                      <svg
                        className={
                          "h-[20px] w-[20px] mh5:h-[28px] mh5:w-[28px]"
                        }
                        viewBox="0 0 48 48"
                        id="icon-notfallnr"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M24 41.647a13.892 13.892 0 01-3.114-1.314c-7.464-4.28-10.703-14.964-12.108-23.173a76.232 76.232 0 01-.871-7.18c8.218.386 11.436-1.155 15.793-3.241l.3-.143.297.143c4.36 2.086 7.601 3.627 15.793 3.241-.46 6.369-2.971 27.936-16.09 31.667zM41.691 6.631c-8.72.659-11.453-.652-15.979-2.82L24 3l-1.712.814c-4.53 2.167-7.259 3.475-15.979 2.816l-1.797-.136.042 1.788c.003.169.101 4.114 1.008 9.422 1.523 8.893 5.133 20.532 13.696 25.438a17.178 17.178 0 004.34 1.755l.401.101.401-.101C42.512 40.322 43.415 9.589 43.444 8.282l.042-1.788-1.797.136zM29.525 20.175h-3.894v-3.874c0-.899-.73-1.622-1.631-1.622-.903 0-1.63.724-1.63 1.622v3.874h-3.897c-.9 0-1.631.727-1.631 1.622s.731 1.622 1.631 1.622h3.897v3.874c0 .899.727 1.622 1.63 1.622.9 0 1.631-.724 1.631-1.622v-3.874h3.894c.9 0 1.631-.727 1.631-1.622s-.73-1.622-1.631-1.622z"
                        ></path>
                      </svg>
                      <div className="flex flex-col">
                        {hotline.map((item) => (
                          <a
                            key={get(item, "content", "")}
                            href={`tel:${get(item, "content")}`}
                          >
                            <span className={"paragraph font-medium"}>
                              {get(item, "title", "")}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {email && (
                    <a
                      className={"mb-[20px] flex items-center gap-x-[10px]"}
                      href={`mailto:${email}`}
                    >
                      <svg
                        className={
                          "h-[20px] w-[20px] mh5:h-[28px] mh5:w-[28px]"
                        }
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill={"var(--contact-color)"}
                          d="M4.697 9.3c-1.346 0-2.475 1.156-2.475 2.534v24.331c0 1.378 1.129 2.534 2.475 2.534h38.606c1.346 0 2.475-1.156 2.475-2.534V11.834c0-1.378-1.129-2.534-2.475-2.534H4.697zm2.846 3.041h32.914L24.526 26.914c-.217.198-.835.198-1.052 0L7.543 12.341zm-2.351 1.917l11.121 10.186-11.121 9.425V14.258zm37.616 0v19.611l-11.121-9.425 11.121-10.186zM18.556 26.487l2.939 2.693c1.442 1.319 3.569 1.319 5.011 0l2.939-2.693 10.827 9.172H7.729l10.827-9.172z"
                        ></path>
                      </svg>
                      <span className={"paragraph font-medium"}>{email}</span>
                    </a>
                  )}
                </div>
              </div>
              {link && (
                <div className="self-center md:self-start mh12:basis-1/2">
                  <a
                    className="mx-auto inline-block rounded-[50px] border-[2px] border-solid border-[--color-brand] bg-[--color-brand] px-[35px] py-[9px] text-[14px] font-semibold text-white duration-500 hover:border-[#516a78] hover:bg-[#516a78] mh5:text-[15px] mh9:py-[12px]"
                    href={link}
                  >
                    {link}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
