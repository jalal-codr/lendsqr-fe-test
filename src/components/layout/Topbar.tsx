import styles from "../../styles/base/_layout.module.scss";
import logo from "../../assets/images/Group.svg";
import searchIcon from "../../assets/icons/search.png";
import bellIcon from "../../assets/icons/bell.png";
import avatar from "../../assets/images/avatar.png";
import caretIcon from "../../assets/icons/np_dropdown.png";

const Topbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Lendsqr" />
      </div>

        <div className={styles.center}>
        <div className={styles.search}>
            <input placeholder="Search for anything" />
            <button className={styles.searchBtn}>
            <img src={searchIcon} alt="search" />
            </button>
        </div>
        </div>

        <div className={styles.right}>
        <a href="#">Docs</a>
        <img className={styles.bell} src={bellIcon} alt="notifications" />
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