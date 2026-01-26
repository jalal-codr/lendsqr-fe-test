import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/_usersTable.module.scss';
import MoreVertIcon from '../../assets/icons/ic-more-vert-18px.png';
import FilterIcon from '../../assets/icons/filter-results-button.png';
import EyeIcon from '../../assets/icons/np_view.png';
import BlacklistIcon from '../../assets/icons/np_delete-friend.png';
import ActivateIcon from '../../assets/icons/np_user.png';
import UsersFilter from '../../components/common/UsersFilter';
import type{ UsersFilterValues } from '../../components/common/UsersFilter';

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Inactive' | 'Pending' | 'Blacklisted' | 'Active';
}

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewDetails = (user: User) => {
    localStorage.setItem('selectedUserSummary', JSON.stringify(user));
    navigate(`/users/${user.id}`);
  };

  const toggleMenu = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleApplyFilter = (filters: UsersFilterValues) => {
  console.log(filters);
  // you’ll apply filtering in the parent later
};

const handleResetFilter = () => {
  console.log('reset');
};

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status'].map((header) => (
              <th key={header}>
                <div className={styles.headerContent}>
                  {header} 
                  <img
                    src={FilterIcon}
                    alt="filter"
                    className={styles.filterIcon}
                    onClick={() => setShowFilter((prev) => !prev)}
                  />
                </div>
                {showFilter && (
                    <UsersFilter
                      onApply={handleApplyFilter}
                      onReset={handleResetFilter}
                      onClose={() => setShowFilter(false)}
                    />
                  )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateJoined}</td>
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
                  <div className={styles.popoverMenu} ref={menuRef}>
                    <button onClick={() => handleViewDetails(user)}>
                      <img src={EyeIcon} alt="" /> View Details
                    </button>
                    <button>
                      <img src={BlacklistIcon} alt="" /> Blacklist User
                    </button>
                    <button>
                      <img src={ActivateIcon} alt="" /> Activate User
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;