import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDownIcon, UserCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };
  return (
    <div>
      <Menu>
        <MenuButton className="inline-flex space-x-2 items-center gap-1 rounded-md bg-lime-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 flex">
          <UserCircleIcon size={16} />
          <div className="text-left">
            <p className="text-sm">{user}</p>
            <p className="text-xs font-normal">{role}</p>
          </div>

          <ChevronDownIcon size={16} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
