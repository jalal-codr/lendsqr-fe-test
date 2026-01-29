import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/_usersTable.module.scss';
import MoreVertIcon from '../../assets/icons/ic-more-vert-18px.png';
import FilterIcon from '../../assets/icons/filter-results-button.png';
import EyeIcon from '../../assets/icons/np_view.png';
import BlacklistIcon from '../../assets/icons/np_delete-friend.png';
import ActivateIcon from '../../assets/icons/np_user.png';
import UsersFilter from '../../components/common/UsersFilter';
import type { UsersFilterValues } from '../../components/common/UsersFilter';
import { useUserDetails } from '../../hooks/useLocalStorage'; 
import type { UserDetails } from '../../features/users/users.types';
import { formatUserDate } from '../../utils/formatDate';

interface UserTableProps {
  users: UserDetails[];
  onApplyFilter: (values: UsersFilterValues) => void;
  onResetFilter: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onApplyFilter, onResetFilter }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<string | null>(null);
  const [openUpwards, setOpenUpwards] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { saveUserDetails } = useUserDetails();

  // Handle click outside for both menu and filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest(`.${styles.filterIcon}`)) {
          setShowFilter(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewDetails = (user: UserDetails) => {
    saveUserDetails(user);
    navigate(`/users/${user.id}`);
    setActiveMenu(null);
  };

  const toggleMenu = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    
    // Detect if row is near bottom of screen to flip menu upward
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    
    // If button is in the bottom 40% of the screen, open upwards
    if (buttonRect.bottom > screenHeight * 0.6) {
      setOpenUpwards(true);
    } else {
      setOpenUpwards(false);
    }
    
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const toggleFilter = (e: React.MouseEvent, header: string) => {
    e.stopPropagation();
    setShowFilter(showFilter === header ? null : header);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status'].map((header) => (
              <th key={header} className={styles.headerCell}>
                <div className={styles.headerContent}>
                  {header} 
                  <img
                    src={FilterIcon}
                    alt="filter"
                    className={styles.filterIcon}
                    onClick={(e) => toggleFilter(e, header)}
                  />
                </div>
                
                {showFilter === header && ( 
                  <div className={styles.filterContainer} ref={filterRef}>
                    <UsersFilter
                      onApply={(values) => {
                        onApplyFilter(values);
                        setShowFilter(null);
                      }}
                      onReset={() => {
                        onResetFilter();
                        setShowFilter(null);
                      }}
                      onClose={() => setShowFilter(null)}
                    />
                  </div>
                )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.profile.username}</td>
                <td>{user.profile.email}</td>
                <td>{user.profile.phoneNumber}</td>
                <td>{formatUserDate(user.dateJoined)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[user.status.toLowerCase()]}`}>
                    {user.status}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button className={styles.actionBtn} onClick={(e) => toggleMenu(e, user.id)}>
                    <img src={MoreVertIcon} alt="actions" />
                  </button>

                  {activeMenu === user.id && (
                    <div 
                      className={`${styles.popoverMenu} ${openUpwards ? styles.openUp : ''}`} 
                      ref={menuRef}
                    >
                      <button onClick={() => handleViewDetails(user)}>
                        <img src={EyeIcon} alt="view" /> View Details
                      </button>
                      <button className={styles.blockBtn} onClick={() => setActiveMenu(null)}>
                        <img src={BlacklistIcon} alt="blacklist" /> Blacklist User
                      </button>
                      <button  onClick={() => setActiveMenu(null)}>
                        <img src={ActivateIcon} alt="activate" /> Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.noDataCell}>
                <div className={styles.noDataWrapper}>
                  <p>No records found matching your filters.</p>
                  <button onClick={onResetFilter} className={styles.resetSearchBtn}>
                    Reset Filter
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;