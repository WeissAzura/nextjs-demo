import Breadcrumbs from "@/app/components/breadcrumbs";
import Contact from "@/app/components/contact_section";
import { InfoRow } from "@/app/page";
import ReactMarkdown from "react-markdown";
import ContactList from "@/app/components/contact_info";
import GMap from "@/app/components/google_map";
import { get } from "lodash";
export const metadata = {
  title: "Customer Support | Wirtgen Group in USA and Canada",
  description: "WIRTGEN AMERICA - Your WIRTGEN GROUP contact in USA and Canada",
};
async function fetchData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customer-support?populate=deep,3`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function CustomerSupport() {
  const data = fetchData();
  const [generalData] = await Promise.all([data]);
  const title = get(generalData, "data.attributes.title", "Customer Support");
  const contact = get(generalData, "data.attributes.contact", {});
  const contactSectionTitle = get(
    generalData,
    "data.attributes.contact_section_title",
    ""
  );
  const contactSectionContent = get(
    generalData,
    "data.attributes.contact_section_content",
    ""
  );
  const contactInfo = get(generalData, "data.attributes.contact_info", []);
  const infoRows = get(generalData, "data.attributes.info_rows", []);
  const mapSectionTitle = get(
    generalData,
    "data.attributes.map_section_title",
    ""
  );
  const mapSectionContent = get(
    generalData,
    "data.attributes.map_section_content",
    ""
  );
  return (
    <>
      <Breadcrumbs
        color={"gray"}
        items={[
          { label: "Home", path: "/" },
          { label: "Customer Support", path: "/customer-support" },
        ]}
      />
      <div className={"pt-[30px] md:pt-[40px] mh9:pt-[50px] mh12:pt-[60px]"}>
        <div className={"page-container"}>
          <div
            className={
              "mx-auto text-center mh5:max-w-[83.33333333%] mh12:max-w-[65%]"
            }
          >
            <h2 className={"heading-1 font-bold"}>{title}</h2>
          </div>
        </div>
      </div>
      <Contact color={"gray"} data={contact} />
      <div className={"py-[30px] md:py-[40px] mh9:py-[50px] mh12:py-[60px]"}>
        <div className={"page-container"}>
          <div className={"mx-auto mh5:max-w-[83.33333333%] mh12:max-w-[65%]"}>
            <div className="heading-2 font-bold">{contactSectionTitle}</div>
            <div className="paragraph">{contactSectionContent}</div>
          </div>
        </div>
      </div>
      <ContactList rows={contactInfo} />
      <InfoRow rows={infoRows} reverse={true} />
      <div className={"pb-[30px] md:pb-[40px] mh9:pb-[50px] mh12:pb-[60px]"}>
        <div className={"page-container"}>
          <div className={"mx-auto mh5:max-w-[83.33333333%] mh12:max-w-[65%]"}>
            <div className="heading-2 font-bold">{mapSectionTitle}</div>
            <ReactMarkdown className="paragraph whitespace-pre-wrap">
              {mapSectionContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <GMap />
    </>
  );
}
