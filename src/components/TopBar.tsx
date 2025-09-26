import React from "react";

function TopBar({ role, title }: { role: string; title: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl">ARC - {title} </h1>
      <div className="flex gap-3 items-center">
        <p>You Are logged in : </p>
        <p className="bg-gray-200 inline-block text-xs p-2 rounded bg-lime-600 text-white">
          {role}
        </p>
      </div>
    </div>
  );
}

export default TopBar;
