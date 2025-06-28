import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "src/context/UserContext";
import { PageContext } from "src/context/PageContext";
import { SidebarContext } from "src/context/SidebarContext";
import { FiX, FiHome, FiUser, FiUsers, FiLifeBuoy } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";

const menus = [
  {
    name: "Dashboard",
    icon: FiHome,
    role: ["admin", "operator"],
    link: "/",
  },

  {
    name: "Profile",
    icon: FiUser,
    role: ["admin", "operator"],
    link: "/me",
  },
];

export function SidebarDefault() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { page, setPage } = useContext(PageContext);
  const { sidebar, setSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const path = window.location.pathname;
    const page = path.split("/")[1];
    // get index of page
    const index = menus.findIndex((menu) => {
      const tempPage = menu.link.split("/")[1];
      return tempPage == page;
    });
    setPage(menus[index]?.name);
  }, []);

  async function handleLogout() {
    document.cookie = "token=; Max-Age=0";
    setUser(null);
  }

  return (
    <div id="sidebar" className="p-5 bg-white h-screen shadow-xl">
      <button
        onClick={() => {
          setSidebar(false);
        }}
        className="absolute right-2 top-4 md:hidden"
      >
        <FiX color="fff" size={24} />
      </button>
      <div className="h-full flex flex-col">
        <div className="mb-4 w-full flex gap-2 items-center px-3">
          <FiLifeBuoy size={28} color="#fff" />
          <h2 className="f-h4">
            AUTO <span className="text-primary-main">ML</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2 mt-4 grow">
          {menus.map((menu, index) => {
            if (menu.role.includes(user.role)) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setPage(menu.name);
                    navigate(menu.link);
                  }}
                  className={`flex items-center gap-4 py-3 px-3 rounded-md hover:bg-primary-main hover:text-white ${
                    page == menu.name ||
                    (page == "" && menu.name == "Dashboard")
                      ? "bg-primary-main text-white"
                      : ""
                  }`}
                >
                  <div className="">
                    <menu.icon color="" size={24} />
                  </div>
                  <h4 className="uppercase text-[12px] font-bold text-left">
                    {menu.name}
                  </h4>
                </button>
              );
            }
          })}

          <button
            onClick={() => handleLogout()}
            className="md:hidden flex items-center w-full gap-4 py-3 px-3 rounded-md hover:bg-primary-main hover:text-white mt-4"
          >
            <div className="">
              <PiSignOutBold size={24} color="" />
            </div>
            <h4 className="uppercase text-[10px] font-bold">Log Out</h4>
          </button>
        </div>

        <div className="md:flex hidden">
          <button
            onClick={() => handleLogout()}
            className="flex items-center w-full gap-4 py-3 px-3 rounded-md hover:bg-primary-main hover:text-white "
          >
            <div className="">
              <PiSignOutBold size={24} color="" />
            </div>
            <h4 className="uppercase text-[10px] font-bold">Log Out</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
