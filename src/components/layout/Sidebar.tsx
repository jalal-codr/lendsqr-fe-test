import styles from "../../styles/base/Layout.module.scss";
import briefCaseIcon from '../../assets/icons/briefcase 1.png'
import caretIcon from "../../assets/icons/np_next.png";
import usersIcon from '../../assets/icons/user-friends 1.png'
import guarantorsIcon from '../../assets/icons/users.png'
import homeIcon from '../../assets/icons/home.png'
import sackIcon from '../../assets/icons/sack.png'
import handshakeIcon from '../../assets/icons/handshake-regular.png'
import piggyBankIcon from '../../assets/icons/piggy-bank.png'
import groupIcon from '../../assets/icons/Group.png'
import userCheckIcon from '../../assets/icons/user-check.png'
import userTimesIcon from '../../assets/icons/user-times.png'
import savingsProductIcon from '../../assets/icons/np_bank_.png'
import coinsIcon from '../../assets/icons/coins-solid.png'
import transactionIcon from '../../assets/icons/icon.png'
import serviceIcon from '../../assets/icons/galaxy.png'
import settlementIcon from '../../assets/icons/scroll.png'
import reportIcon from '../../assets/icons/chart-bar.png'
import sliderIcon from '../../assets/icons/sliders-h.png'
import percentageIcon from '../../assets/icons/badge-percent.png'  
import clipboardIcon from '../../assets/icons/clipboard-list.png'


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
        <div className={styles.switchOrg}>
            <img src={briefCaseIcon} alt="organization" />
            <span>Switch Organization</span>
            <img
                src={caretIcon}
                alt="dropdown"
                className={styles.caret}
            />
        </div>
        <div className={styles.switchOrg}>
            <img src={homeIcon} alt="home" />
            <span>Dashboard</span>
        </div>

      <nav>
        <p className={styles.section}>CUSTOMERS</p>
        <a className={styles.active}>
        <img src={usersIcon} alt="users" />
            <span>Users</span>
        </a>
        <a>
            <img src={guarantorsIcon} alt="guarantors" />
            <span>Guarantors</span>
        </a>
        <a>
            <img src={sackIcon} alt="sack" />
            <span>Loans</span>
        </a>
        <a>
            <img src={handshakeIcon} alt="decision models" />
            <span>Decision Models</span>
        </a>
        <a>
            <img src={piggyBankIcon} alt="savings" />
            <span>Savings</span>
        </a>
        <a>
            <img src={groupIcon} alt="loan requests" />
            <span>Loan Requests</span>
        </a>
        <a>
            <img src={userCheckIcon} alt="whitelist" />
            <span>Whitelist</span>
        </a>
        <a>
            <img src={userTimesIcon} alt="karma" />
            <span>Karma</span>
        </a>

        <p className={styles.section}>BUSINESSES</p>
        <a>
            <img src={briefCaseIcon} alt="organization" />
            <span>Organization</span>
        </a>
        <a>
            <img src={groupIcon} alt="loan products" />
            <span>Loan Products</span>
        </a>
        <a>
            <img src={savingsProductIcon} alt="savings products" />
            <span>Savings Products</span>
        </a>
        <a>
            <img src={coinsIcon} alt="fees and charges" />
            <span>Fees and Charges</span>
        </a>
        <a>
            <img src={transactionIcon} alt="transactions" />
            <span>Transactions</span>
        </a>
        <a>
            <img src={groupIcon} alt="services" />
            <span>Services</span>
        </a>
        <a>
            <img src={serviceIcon} alt="service account" />
            <span>Service Account</span>
        </a>
        <a>
            <img src={settlementIcon} alt="settlements" />
            <span>Settlements</span>
        </a>
        <a>
            <img src={reportIcon} alt="reports" />
            <span>Reports</span>
        </a>

        <p className={styles.section}>SETTINGS</p>
        <a>
            <img src={sliderIcon} alt="preferences" />
            <span>Preferences</span>
        </a>
        <a>
            <img src={percentageIcon} alt="fees and pricing" />
            <span>Fees and Pricing</span>
        </a>
        <a>
            <img src={clipboardIcon} alt="audit logs" />
            <span>Audit Logs</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;