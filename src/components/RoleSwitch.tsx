import React from "react";
import { Link } from "react-router-dom";

function RoleSwitch() {
  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg flex items-center">
      <Link to="/admin-settings">admin</Link>
      <Link to="/filter-campaign" className="ml-4">
        analyst
      </Link>
    </div>
  );
}

export default RoleSwitch;
