import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { NavbarDefault } from "src/components/navbar";
import { SidebarDefault } from "src/components/sidebar";
import { SidebarContext } from "src/context/SidebarContext";

export function DashboardLayout({ children }) {
  const { sidebar, setSidebar } = useContext(SidebarContext);
  return (
    <div
      className="grid grid-cols-12 h-screen overflow-hidden"
      data-theme="light"
    >
      {sidebar ? (
        <div className="fixed w-2/3 z-10">
          <SidebarDefault />
        </div>
      ) : null}
      <div className="lg:col-span-2 hidden lg:block h-full">
        <SidebarDefault />
      </div>
      <div className="lg:col-span-10 col-span-12 overflow-auto">
        <NavbarDefault />
        <div className="grid grid-cols-12 gap-4 px-4 py-4">
          <Toaster position="bottom-right" reverseOrder={false} />
          {children}
        </div>
      </div>
    </div>
  );
}
