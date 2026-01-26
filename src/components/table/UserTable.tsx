import React from 'react';
import styles from '../../styles/components/_usersTable.module.scss';
import MoreVertIcon from '../../assets/icons/ic-more-vert-18px.png';
import FilterIcon from '../../assets/icons/filter-results-button.png'; 

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
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status'].map((header) => (
              <th key={header}>
                <div className={styles.headerContent}>
                  {header} <img src={FilterIcon} alt="filter" />
                </div>
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
              <td>
                <button className={styles.actionBtn}>
                  <img src={MoreVertIcon} alt="actions" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;