import React from "react";
import Avatar from "./Avatar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoProjectRoadmap } from "react-icons/go";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Button } from "./Button";

function Sidebar() {
  const { logout } = useLogout();
  const { user, isPending } = useSelector((store) => store.user);
  return (
    <div className="bg-violet-400 min-h-screen w-[350px] text-white flex flex-col">
      <Avatar user={user} />
      <ul className="flex flex-col pr-0 pl-10 mb-auto">
        <li className="nav-item">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/">
            <span className="flex items-center gap-2">
              <GoProjectRoadmap className="text-xl" /> Project
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/create">
            <span className="flex items-center gap-2">
              <IoIosAddCircleOutline className="text-xl" /> Create
            </span>
          </NavLink>
        </li>
      </ul>

      <div className="mb-10 flex justify-center">
        <Button onClick={logout} loading={isPending}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
