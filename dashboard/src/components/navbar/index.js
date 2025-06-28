import { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import iconAvatar from "src/assets/icon/avatar.svg";
import { PageContext } from "src/context/PageContext";
import { SidebarContext } from "src/context/SidebarContext";
import { UserContext } from "src/context/UserContext";

export function NavbarDefault() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { page, setPage } = useContext(PageContext);
  const { sidebar, setSidebar } = useContext(SidebarContext);

  return (
    <div className="w-full bg-white flex justify-between items-center py-4 px-5 shadow-s1">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            setSidebar(!sidebar);
          }}
          className="rounded-lg bg-slate-900 shadow-s1 p-2 lg:hidden "
        >
          <FiMenu color="fff" />
        </button>
        <h2 className="lg:f-h2 f-h3  font-bold text-gray-800">{page}</h2>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-right lg:block hidden">
          <h5 className="f-h5">
            <p>{user.name}</p>
          </h5>
          <p className="f-p2-r capitalize">{user.role}</p>
        </div>
        <button
          onClick={() => {
            setPage("Profile");
            navigate("/me");
          }}
          className="rounded-full w-10 h-10 overflow-hidden"
        >
          <img src={user.image ?? iconAvatar} />
        </button>
      </div>
    </div>
  );
}
