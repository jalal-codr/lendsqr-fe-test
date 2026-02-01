import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/components/_sidebar.module.scss";
import { useAuth } from "../../hooks/useAuth";

// Icon Imports
import briefCaseIcon from "../../assets/icons/briefcase 1.png";
import caretIcon from "../../assets/icons/np_next.png";
import usersIcon from "../../assets/icons/user-friends 1.png";
import guarantorsIcon from "../../assets/icons/users.png";
import homeIcon from "../../assets/icons/home.png";
import sackIcon from "../../assets/icons/sack.png";
import handshakeIcon from "../../assets/icons/handshake-regular.png";
import piggyBankIcon from "../../assets/icons/piggy-bank.png";
import groupIcon from "../../assets/icons/Group.png";
import userCheckIcon from "../../assets/icons/user-check.png";
import userTimesIcon from "../../assets/icons/user-times.png";
import savingsProductIcon from "../../assets/icons/np_bank_.png";
import coinsIcon from "../../assets/icons/coins-solid.png";
import transactionIcon from "../../assets/icons/icon.png";
import serviceIcon from "../../assets/icons/galaxy.png";
import settlementIcon from "../../assets/icons/scroll.png";
import reportIcon from "../../assets/icons/chart-bar.png";
import sliderIcon from "../../assets/icons/sliders-h.png";
import percentageIcon from "../../assets/icons/badge-percent.png";
import clipboardIcon from "../../assets/icons/clipboard-list.png";
import tireIcon from "../../assets/icons/tire.png";
import logoutIcon from "../../assets/icons/sign-out.png";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Navigation Configuration Array
const navConfig = [
  {
    title: "CUSTOMERS",
    links: [
      { name: "Users", path: "/users", icon: usersIcon },
      { name: "Guarantors", path: "/guarantors", icon: guarantorsIcon },
      { name: "Loans", path: "/loans", icon: sackIcon },
      { name: "Decision Models", path: "/decision-models", icon: handshakeIcon },
      { name: "Savings", path: "/savings", icon: piggyBankIcon },
      { name: "Loan Requests", path: "/loan-requests", icon: groupIcon },
      { name: "Whitelist", path: "/whitelist", icon: userCheckIcon },
      { name: "Karma", path: "/karma", icon: userTimesIcon },
    ],
  },
  {
    title: "BUSINESSES",
    links: [
      { name: "Organization", path: "/organization", icon: briefCaseIcon },
      { name: "Loan Products", path: "/loan-products", icon: groupIcon },
      { name: "Savings Products", path: "/savings-products", icon: savingsProductIcon },
      { name: "Fees and Charges", path: "/fees-charges", icon: coinsIcon },
      { name: "Transactions", path: "/transactions", icon: transactionIcon },
      { name: "Services", path: "/services", icon: groupIcon },
      { name: "Service Account", path: "/service-account", icon: serviceIcon },
      { name: "Settlements", path: "/settlements", icon: settlementIcon },
      { name: "Reports", path: "/reports", icon: reportIcon },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      { name: "Preferences", path: "/preferences", icon: sliderIcon },
      { name: "Fees and Pricing", path: "/fees-pricing", icon: percentageIcon },
      { name: "Audit Logs", path: "/audit-logs", icon: clipboardIcon },
      { name: "Systems Messages", path: "/systems-messages", icon: tireIcon },
    ],
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    onClose();
  };

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      {/* Organization Switcher */}
      <div className={styles.switchOrg}>
        <img src={briefCaseIcon} alt="organization" />
        <span>Switch Organization</span>
        <img src={caretIcon} alt="dropdown" className={styles.caret} />
      </div>

      <nav className={styles.navContainer}>
        {/* Dashboard Link (Static as it sits above sections) */}
        <NavLink to="/" className={linkClass} onClick={onClose} end>
          <img src={homeIcon} alt="home" />
          <span>Dashboard</span>
        </NavLink>

        {/* Dynamic Navigation Sections */}
        {navConfig.map((section) => (
          <div key={section.title} className={styles.navSection}>
            <p className={styles.section}>{section.title}</p>
            {section.links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={onClose}
              >
                <img src={link.icon} alt={link.name.toLowerCase()} />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}

        {/* LOGOUT & FOOTER */}
        <div className={styles.logoutWrapper}>
          <div className={styles.divider}></div>
          
          <div className={styles.logoutBtn} onClick={handleLogout} role="button">
            <img src={logoutIcon} alt="logout" />
            <span>Logout</span>
          </div>

          <div className={styles.version}>
            <span>v1.2.0</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;