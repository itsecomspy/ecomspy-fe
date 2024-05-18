import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import dayjs from 'dayjs/esm/index.js'

const HeaderWrapper = styled.table`
  border: 0;
`;

const TableHeader = ({ children }: { children: any }) => {
  const { lan } = useLanguageContext();

  return (
    <HeaderWrapper>
      <thead>
        <tr className="bg-[#FFFFFF05]">
          <th className="text-[11px] sm:text-[13px] text-left font-normal text-[#FFFFFFA3] px-2 py-3">
            {planText[lan]}
          </th>
          <th className="text-[11px] sm:text-[13px] text-left font-normal text-[#FFFFFFA3] px-2 py-3">
            {dateText[lan]}
          </th>
          <th className="text-[11px] sm:text-[13px] text-left font-normal text-[#FFFFFFA3] px-2 py-3">
            {amountText[lan]}
          </th>
          <th className="text-[11px] sm:text-[13px] text-left font-normal text-[#FFFFFFA3] px-2 py-3">
            {statusText[lan]}
          </th>
        </tr>
      </thead>
      {children}
    </HeaderWrapper>
  );
};

const colorCodes = (c: string) => {
  switch (c.toLowerCase()) {
    case "active":
      return "#24CD09";
    case "cancelled":
      return "#F96E46";
    case "completed":
      return "#ffffff";
    default:
      return "#ffffff";
  }
};

export const BillingTable = ({ data }: { data: any }) => {
  let plan = (val: number) => {
    switch (val) {
      case 0:
        return "Free"
      case 1:
        return "Starter"
      case 2:
        return "Premium"
      case 3:
        return "Business"
      default:
        return "Free"
    }
  };

  return (
    <TableHeader>
      <tbody>
        {data &&
          data?.map((d: any, i: any) => (
            <tr className="border-b-[1px] h-[56px] border-[#FFFFFF0A]" key={i}>
              <td className="text-[12px] sm:text-[13px] text-left font-light px-2 py-3">
                {plan(d.plan)} Plan
              </td>
              <td className="text-[12px] sm:text-[13px] text-left font-light px-2 py-3">
                {dayjs(d.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-[12px] sm:text-[13px] text-left font-light px-2 py-3">
                $ {d.price.toFixed(2)}
              </td>
              <td
                style={{ color: colorCodes(d.status) }}
                className="text-[12px] sm:text-[13px] capitalize text-left font-light px-2 py-3"
              >
                {d.status}
              </td>
            </tr>
          ))}
      </tbody>
    </TableHeader>
  );
};

const planText: any = {
  en: "Plan name",
  fr: "Nom du forfait",
};
const dateText: any = {
  en: "Date",
  fr: "Date",
};
const amountText: any = {
  en: "Amount",
  fr: "Montant",
};
const statusText: any = {
  en: "Status",
  fr: "Statut",
};
