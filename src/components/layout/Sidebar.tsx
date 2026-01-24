import { NavLink } from "react-router-dom";
import styles from "../../styles/components/_sidebar.module.scss";

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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  // Helper to handle active styling logic
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      {/* Organization Switcher */}
      <div className={styles.switchOrg}>
        <img src={briefCaseIcon} alt="organization" />
        <span>Switch Organization</span>
        <img src={caretIcon} alt="dropdown" className={styles.caret} />
      </div>

      {/* Dashboard Link */}
      <NavLink to="/" className={linkClass} onClick={onClose}>
        <img src={homeIcon} alt="home" />
        <span>Dashboard</span>
      </NavLink>

      <nav>
        {/* CUSTOMERS SECTION */}
        <p className={styles.section}>CUSTOMERS</p>

        <NavLink to="/users" className={linkClass} onClick={onClose}>
          <img src={usersIcon} alt="users" />
          <span>Users</span>
        </NavLink>

        <NavLink to="/guarantors" className={linkClass} onClick={onClose}>
          <img src={guarantorsIcon} alt="guarantors" />
          <span>Guarantors</span>
        </NavLink>

        <NavLink to="/loans" className={linkClass} onClick={onClose}>
          <img src={sackIcon} alt="loans" />
          <span>Loans</span>
        </NavLink>

        <NavLink to="/decision-models" className={linkClass} onClick={onClose}>
          <img src={handshakeIcon} alt="decision models" />
          <span>Decision Models</span>
        </NavLink>

        <NavLink to="/savings" className={linkClass} onClick={onClose}>
          <img src={piggyBankIcon} alt="savings" />
          <span>Savings</span>
        </NavLink>

        <NavLink to="/loan-requests" className={linkClass} onClick={onClose}>
          <img src={groupIcon} alt="loan requests" />
          <span>Loan Requests</span>
        </NavLink>

        <NavLink to="/whitelist" className={linkClass} onClick={onClose}>
          <img src={userCheckIcon} alt="whitelist" />
          <span>Whitelist</span>
        </NavLink>

        <NavLink to="/karma" className={linkClass} onClick={onClose}>
          <img src={userTimesIcon} alt="karma" />
          <span>Karma</span>
        </NavLink>

        {/* BUSINESSES SECTION */}
        <p className={styles.section}>BUSINESSES</p>

        <NavLink to="/organization" className={linkClass} onClick={onClose}>
          <img src={briefCaseIcon} alt="organization" />
          <span>Organization</span>
        </NavLink>

        <NavLink to="/loan-products" className={linkClass} onClick={onClose}>
          <img src={groupIcon} alt="loan products" />
          <span>Loan Products</span>
        </NavLink>

        <NavLink to="/savings-products" className={linkClass} onClick={onClose}>
          <img src={savingsProductIcon} alt="savings products" />
          <span>Savings Products</span>
        </NavLink>

        <NavLink to="/fees-charges" className={linkClass} onClick={onClose}>
          <img src={coinsIcon} alt="fees and charges" />
          <span>Fees and Charges</span>
        </NavLink>

        <NavLink to="/transactions" className={linkClass} onClick={onClose}>
          <img src={transactionIcon} alt="transactions" />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/services" className={linkClass} onClick={onClose}>
          <img src={groupIcon} alt="services" />
          <span>Services</span>
        </NavLink>

        <NavLink to="/service-account" className={linkClass} onClick={onClose}>
          <img src={serviceIcon} alt="service account" />
          <span>Service Account</span>
        </NavLink>

        <NavLink to="/settlements" className={linkClass} onClick={onClose}>
          <img src={settlementIcon} alt="settlements" />
          <span>Settlements</span>
        </NavLink>

        <NavLink to="/reports" className={linkClass} onClick={onClose}>
          <img src={reportIcon} alt="reports" />
          <span>Reports</span>
        </NavLink>

        {/* SETTINGS SECTION */}
        <p className={styles.section}>SETTINGS</p>

        <NavLink to="/preferences" className={linkClass} onClick={onClose}>
          <img src={sliderIcon} alt="preferences" />
          <span>Preferences</span>
        </NavLink>

        <NavLink to="/fees-pricing" className={linkClass} onClick={onClose}>
          <img src={percentageIcon} alt="fees and pricing" />
          <span>Fees and Pricing</span>
        </NavLink>

        <NavLink to="/audit-logs" className={linkClass} onClick={onClose}>
          <img src={clipboardIcon} alt="audit logs" />
          <span>Audit Logs</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;