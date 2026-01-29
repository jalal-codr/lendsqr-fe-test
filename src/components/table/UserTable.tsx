import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { saveUserDetails } = useUserDetails();

  // Handle click outside for menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setMenuPosition(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle click outside for filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        const isFilterIcon = target.closest(`.${styles.filterIcon}`);
        
        if (!isFilterIcon) {
          setShowFilter(false);
        }
      }
    };
    
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  // Scroll to show filter when opened
  useEffect(() => {
    if (showFilter && filterRef.current) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // On mobile, scroll the filter into view with some padding
        setTimeout(() => {
          filterRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }, 100);
      }
    }
  }, [showFilter]);

  const handleViewDetails = (user: UserDetails) => {
    saveUserDetails(user);
    navigate(`/users/${user.id}`);
    setActiveMenu(null);
    setMenuPosition(null);
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    e.stopPropagation();
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      setMenuPosition({
        top: rect.bottom + 5,
        left: window.innerWidth - 170,
      });
    } else {
      setMenuPosition({
        top: rect.bottom + 5,
        left: rect.right + window.scrollX - 180,
      });
    }
    
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilter((prev) => !prev);
  };

  return (
    <div className={styles.tableWrapper} ref={tableWrapperRef}>
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
                    onClick={toggleFilter}
                  />
                </div>
                
                {/* Anchor filter to Organization column */}
                {showFilter && header === 'Organization' && ( 
                    <div className={styles.filterContainer} ref={filterRef}>
                        <UsersFilter
                        onApply={(values) => {
                            onApplyFilter(values);
                            setShowFilter(false);
                        }}
                        onReset={() => {
                            onResetFilter();
                            setShowFilter(false);
                        }}
                        onClose={() => setShowFilter(false)}
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
                  <button 
                    ref={(el) => {
                      if (el) buttonRefs.current[user.id] = el;
                    }}
                    className={styles.actionBtn} 
                    onClick={(e) => toggleMenu(e, user.id)}
                  >
                    <img src={MoreVertIcon} alt="actions" />
                  </button>

                  {activeMenu === user.id && menuPosition && createPortal(
                    <div 
                      className={styles.popoverMenu} 
                      ref={menuRef}
                      style={{
                        position: 'fixed',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                        zIndex: 1000,
                      }}
                    >
                      <button onClick={() => handleViewDetails(user)}>
                        <img src={EyeIcon} alt="view" /> View Details
                      </button>
                      <button onClick={() => {
                        setActiveMenu(null);
                        setMenuPosition(null);
                      }}>
                        <img src={BlacklistIcon} alt="blacklist" /> Blacklist User
                      </button>
                      <button onClick={() => {
                        setActiveMenu(null);
                        setMenuPosition(null);
                      }}>
                        <img src={ActivateIcon} alt="activate" /> Activate User
                      </button>
                    </div>,
                    document.body
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.noDataCell}>
                <div className={styles.noDataWrapper}>
                  <p>No records found matching your filters.</p>
                  <button 
                    onClick={onResetFilter} 
                    className={styles.resetSearchBtn}
                  >
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