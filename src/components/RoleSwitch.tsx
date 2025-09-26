import React from "react";
import { Link } from "react-router-dom";

function RoleSwitch() {
  return (
    <div className="fixed bottom-4 right-4 bg-lime-100 p-4 rounded-lg shadow-lg flex items-center">
      <Link to="/admin-settings">admin</Link>
      <Link to="/list-campaigns" className="ml-4">
        analyst
      </Link>
    </div>
  );
}

export default RoleSwitch;
