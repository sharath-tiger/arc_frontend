import React from "react";
import { dataGenerator } from "./data";
import RenderTableData from "../../utils/RenderTableData";
const DATA = dataGenerator(10);
function ViableList() {
  const firstItem = DATA[0];

  const columns = Object.keys(firstItem);
  return (
    <div className="bg-white p-3 shadow-md rounded w-full">
      <h2 className="mb-5 text-3xl">Mortgage List</h2>
      <div className="overflow-x-scroll">
        <table>
          <thead className="bg-gray-100">
            {columns.map((el) => (
              <th
                className="text-sm font-normal border p-2 capitalize"
                key={el}
              >
                {el}
              </th>
            ))}
          </thead>
          <tbody>
            {DATA.map((el) => (
              <tr key={el.loan_id}>
                {Object.entries(el).map(([k, v]) => {
                  return <RenderTableData keyName={k} key={k} value={v} />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="bg-lime-700 p-2 text-white mt-5 rounded flex">
        Publish Data
      </button>
    </div>
  );
}

export default ViableList;
