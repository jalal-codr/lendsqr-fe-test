import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Sidebar & Topbar will live here */}
      <Outlet />
    </div>
  );
};

export default Layout;