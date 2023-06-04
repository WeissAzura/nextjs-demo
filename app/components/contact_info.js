"use client";
import { useRef, useState, useEffect } from "react";
import joinClass from "@/app/lib/joinClass";
const Card = ({ row, active, setActive }) => {
  const accordionRef = useRef(null);
  const buttonRef = useRef(null);
  return (
    <div>
      <div
        ref={buttonRef}
        className="cursor-pointer bg-[#f3f3f3]"
        onClick={() => {
          active === row.id ? setActive(null) : setActive(row.id);
        }}
        onTransitionEnd={() => {
          active === row.id && buttonRef.current.scrollIntoView();
        }}
      >
        <div
          className={joinClass(
            "flex w-full justify-between rounded border border-solid border-transparent px-[15px] py-[20px] md:items-center md:px-[20px] mh9:px-[30px] mh9:py-[23px]"
          )}
        >
          <div>
            <div className="heading-4 font-semibold">{row?.title}</div>
            <div className="text-[13px] font-medium leading-[30px] md:hidden">
              {row?.employee?.length} Contacts
            </div>
          </div>
          <div className="flex items-center gap-x-[43px]">
            <div className="intro hidden font-semibold md:block">
              {row?.employee?.length} Contacts
            </div>
            <svg
              className={joinClass(
                "h-[25px] w-[25px] transition-[transform] duration-[300ms] ease-in-out",
                active === row.id && "rotate-180"
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
        </div>
      </div>
      <div
        ref={accordionRef}
        className={joinClass(
          "grid grid-cols-1 overflow-hidden px-[20px] transition-[max-height] duration-[250ms] ease-out mh5:grid-cols-2 md:grid-cols-3"
        )}
        style={{
          maxHeight: active === row.id ? accordionRef.current.scrollHeight : 0,
        }}
      >
        {row?.employee?.map((employee) => (
          <div key={employee?.id}>
            <div className="mh5:mb-[50px] mh5:px-[30px] mh9:px-[50px]">
              <div className="heading-[23px] mh5:heading-[27px] pb-[10px] pt-[20px] text-[20px] font-semibold mh5:text-[22px]">
                {employee?.name}
              </div>
              <div className="paragraph pb-[10px]">{employee?.position}</div>
              <div className="border-t border-solid border-[rgba(0,0,0,.125)] pt-[10px]">
                {employee?.phone && (
                  <a
                    className={"flex items-center gap-x-[10px]"}
                    href={`tel:${employee?.phone}`}
                  >
                    <svg
                      className={"h-[16px] w-[16px]"}
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="var(--color-brand)"
                        d="M14.53 20.298a24.95 24.95 0 004.609 6.52 30.986 30.986 0 006.965 5.781c.571.336 1.155.634 1.791.953.893.512 2.032.322 2.694-.435a208 208 0 001.89-1.87c.357-.356.714-.713 1.073-1.068l.061-.061c.117-.117.231-.232.38-.355a1.4 1.4 0 011.065-.405c.37.022.709.185.97.476.757.733 1.501 1.477 2.248 2.224l1.477 1.472c.566.562 1.152 1.142 1.703 1.734l.051.048c.556.55.559 1.448-.013 2.025a4.315 4.315 0 01-.326.365l-.93.943c-.639.645-1.277 1.29-1.905 1.945a4.49 4.49 0 01-3.216 1.371l-.263-.029a14.28 14.28 0 01-4.272-.895 39.672 39.672 0 01-15.824-10.874 40.332 40.332 0 01-6.269-9.068 24.333 24.333 0 01-2.146-5.893 6.71 6.71 0 01.038-3.878 5.243 5.243 0 011.061-1.581c.672-.731 1.356-1.398 2.081-2.102.291-.283.587-.571.887-.868.463-.459.885-.688 1.308-.688s.847.229 1.315.687l4.879 4.878c.122.127.244.253.381.412a1.308 1.308 0 01-.05 1.926c-.918.969-1.899 1.918-2.848 2.836l-.254.247c-1.107 1.071-1.25 1.823-.612 3.227zm29.326 13.084a161.15 161.15 0 00-6.065-6.058 4.01 4.01 0 00-4.365-.771 6.486 6.486 0 00-2.306 1.717l-2.319 2.334A29.747 29.747 0 0117.32 19.215l.04-.034c.063-.054.115-.098.174-.154.338-.345.68-.685 1.023-1.024.697-.69 1.417-1.404 2.075-2.148a4.193 4.193 0 000-5.7A115.481 115.481 0 0014.89 4.38c-1.949-1.807-4.242-1.838-6.293-.085-.975.841-1.884 1.783-2.763 2.694-.267.277-.534.553-.806.83a7.283 7.283 0 00-2.01 5.572 17.932 17.932 0 001.306 5.917c1.798 4.747 4.688 9.237 8.838 13.724a42.962 42.962 0 0010.617 8.275 30.031 30.031 0 008.099 3.301c.524.111 1.059.195 1.576.275l.719.114.025.004 1.664-.023.089-.016c.083-.029.168-.054.217-.068a6.52 6.52 0 003.766-1.674c1.163-1.116 2.672-2.602 4.034-4.198a4.206 4.206 0 00-.114-5.64z"
                      ></path>
                    </svg>
                    <span className={"small-p"}>{employee?.phone}</span>
                  </a>
                )}
                {employee?.mobile && (
                  <a
                    className={"flex items-center gap-x-[10px]"}
                    href={`tel:${employee?.mobile}`}
                  >
                    <svg
                      className={"h-[16px] w-[16px]"}
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="var(--color-brand)"
                        d="M32.064 43.448H15.936c-.973 0-1.765-.844-1.765-1.881v-2.828h19.658v2.828c0 1.037-.792 1.881-1.765 1.881zM15.936 4.554h16.128c.973 0 1.765.844 1.765 1.882v.355H14.171v-.355c0-1.038.792-1.882 1.765-1.882zm-1.765 31.132V9.842h19.658v25.844H14.171zM32.064 1.501H15.936c-2.552 0-4.628 2.213-4.628 4.934v35.131c0 2.721 2.076 4.934 4.628 4.934h16.128c2.552 0 4.628-2.213 4.628-4.934V6.435c0-2.721-2.076-4.934-4.628-4.934zm-3.672 38.56h-8.784c-.511 0-.93.446-.93.992s.419.992.93.992h8.784c.512 0 .93-.446.93-.992s-.419-.992-.93-.992z"
                      ></path>
                    </svg>
                    <span className={"small-p"}>{employee?.mobile}</span>
                  </a>
                )}
                {employee?.email && (
                  <a
                    className={"mb-[20px] flex items-center gap-x-[10px]"}
                    href={`mailto:${employee?.email}`}
                  >
                    <svg
                      className={"h-[16px] w-[16px]"}
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="var(--color-brand)"
                        d="M4.697 9.3c-1.346 0-2.475 1.156-2.475 2.534v24.331c0 1.378 1.129 2.534 2.475 2.534h38.606c1.346 0 2.475-1.156 2.475-2.534V11.834c0-1.378-1.129-2.534-2.475-2.534H4.697zm2.846 3.041h32.914L24.526 26.914c-.217.198-.835.198-1.052 0L7.543 12.341zm-2.351 1.917l11.121 10.186-11.121 9.425V14.258zm37.616 0v19.611l-11.121-9.425 11.121-10.186zM18.556 26.487l2.939 2.693c1.442 1.319 3.569 1.319 5.011 0l2.939-2.693 10.827 9.172H7.729l10.827-9.172z"
                      ></path>
                    </svg>
                    <span className={"small-p"}>{employee?.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function ContactList({ rows }) {
  const [active, setActive] = useState(null);
  return (
    <div className="section-page">
      <div
        className={
          "page-container flex flex-col gap-y-[10px] pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"
        }
      >
        {rows?.map((row) => (
          <Card key={row?.id} row={row} active={active} setActive={setActive} />
        ))}
      </div>
    </div>
  );
}
