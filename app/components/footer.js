import Image from "next/image";
import wirtgen from "@/public/wirtgen.svg";
import vogele from "@/public/voegele.svg";
import hamm from "@/public/hamm.svg";
import kleemann from "@/public/kleemann.svg";
import rss from "@/public/iconrss.svg";
import facebook from "@/public/iconfb.svg";
import youtube from "@/public/iconyt.svg";
import linkedin from "@/public/iconli.svg";

export default function Footer() {
  return (
    <>
      <div className={"bg-gray-100 mt-auto"}>
        <div className={"page-container"}>
          <div
            className={
              "flex justify-between items-center py-[30px] gap-x-[10px]"
            }
          >
            <div>
              <Image src={wirtgen} alt={"wirtgen"} height={20} />
            </div>
            <div>
              <Image src={vogele} alt={"vogele"} height={20} />
            </div>
            <div>
              <Image src={hamm} alt={"hamm"} height={20} />
            </div>
            <div>
              <Image src={kleemann} alt={"kleemann"} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={"bg-[--color-brand]"}>
        <div
          className={
            "page-container py-[25px] flex justify-between min-[650px]:flex-row flex-col gap-y-[20px]"
          }
        >
          <div className={"text-white paragraph"}>
            Wirtgen America, Inc. | 6030 Dana Way , Antioch, TN 37013, USA
          </div>
          <div className={"flex gap-x-[15px] self-end"}>
            <a
              href={
                "https://www.wirtgen-group.com/en-us/news-and-media/rss/index.xml"
              }
            >
              <Image src={rss} alt={"rss"} height={26} />
            </a>
            <a href={"https://www.facebook.com/WirtgenGroup/"}>
              <Image src={facebook} alt={"facebook"} height={26} />
            </a>
            <a href={"https://www.youtube.com/user/TheWirtgenGroup"}>
              <Image src={youtube} alt={"youtube"} height={26} />
            </a>
            <a href={"https://www.linkedin.com/company/wirtgen-group/"}>
              <Image src={linkedin} alt={"linkedin"} height={26} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
