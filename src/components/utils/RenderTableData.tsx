import React from "react";

function RenderTableData({
  keyName,
  value,
}: Readonly<{ keyName: string; value: string }>) {
  if (keyName === "loan_id") {
    return <td className="text-sm py-1 px-2 border">{value}</td>;
  }
  if (keyName === "interest_rate") {
    return <td className="text-sm py-1 px-2 border">{value} %</td>;
  }
  if (keyName === "origination_date_of_mortgage") {
    return <td className="text-sm py-1 px-2 border">{value.split("T")[0]}</td>;
  }
  if (keyName === "investor") {
    return <td className="text-sm py-1 px-2 border w-[100px]">{value}</td>;
  }
  if (
    keyName === "original_property_value" ||
    keyName === "current_estimated_property_value" ||
    keyName === "original_loan_balance" ||
    keyName === "original_loan_to_value" ||
    keyName === "payment"
  ) {
    return (
      <td className="text-sm py-1 px-2 border">
        $ {Number(value).toLocaleString("en-us")}
      </td>
    );
  }
  return <td className="text-sm py-1 px-2 border">{value}</td>;
}

export default RenderTableData;
