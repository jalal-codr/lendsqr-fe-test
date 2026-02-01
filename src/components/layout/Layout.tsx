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
      <Topbar 
        isOpen={sidebarOpen} 
        onMenuClick={toggleSidebar} 
      />

      <div className={styles.body}>
        {/* Overlay - now includes onClick to close the sidebar */}
        <div
          className={`${styles.overlay} ${sidebarOpen ? styles.visible : ""}`}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        <Sidebar open={sidebarOpen} onClose={closeSidebar} />
        
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;