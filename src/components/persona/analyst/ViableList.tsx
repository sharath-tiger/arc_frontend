import React from "react";
import { dataGenerator } from "./data";
const DATA = dataGenerator(10);
function ViableList() {
  const firstItem = DATA[0];

  const columns = Object.keys(firstItem);
  return (
    <div className="bg-white p-3 shadow-md rounded w-full">
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
                  return (
                    <td className="text-sm py-1 px-2 border" key={k}>
                      {String(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViableList;
