import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "../../styles/base/_layout.module.scss";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.app}>
      {/* Pass the state and the toggle function to the Topbar */}
      <Topbar 
        isOpen={sidebarOpen} 
        onMenuClick={toggleSidebar} 
      />

      <div className={styles.body}>
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={closeSidebar}
          />
        )}

        {/* Pass closeSidebar so the Sidebar can close when a link is clicked */}
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />
        
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;