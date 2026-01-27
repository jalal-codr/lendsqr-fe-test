import { HiMenuAlt2, HiX } from "react-icons/hi";
import styles from "../../styles/components/_topbar.module.scss";
import logo from "../../assets/images/group.svg";
import searchIcon from "../../assets/icons/search.png";
import bellIcon from "../../assets/icons/bell.png";
import avatar from "../../assets/images/avatar.png";
import caretIcon from "../../assets/icons/np_dropdown.png";

interface TopbarProps {
  isOpen: boolean;        // 2. Added isOpen state
  onMenuClick: () => void;
}

const Topbar = ({ isOpen, onMenuClick }: TopbarProps) => {
  return (
    <header className={styles.header}>
      {/* Mobile Hamburger / Close Toggle */}
      <button
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* 3. Conditional Icon Swap */}
        {isOpen ? (
          <HiX color="#213f7d" />
        ) : (
          <HiMenuAlt2 color="#213f7d" />
        )}
      </button>

      {/* Logo */}
      <div className={styles.left}>
        <img src={logo} alt="Lendsqr" />
      </div>

      {/* Search */}
      <div className={styles.center}>
        <div className={styles.search}>
          <input placeholder="Search for anything" />
          <button className={styles.searchBtn}>
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </div>

      {/* Right section */}
      <div className={styles.right}>
        <a href="#">Docs</a>

        <img
          className={styles.bell}
          src={bellIcon}
          alt="notifications"
        />

        <div className={styles.profile}>
          <img src={avatar} alt="user" />
          <span>Adedeji</span>
          <img
            src={caretIcon}
            alt="dropdown"
            className={styles.caret}
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;