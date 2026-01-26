import StatCard from '../../components/ui/StatCard';
import styles from '../../styles/pages/_users.module.scss';
import UserTable from '../../components/table/UserTable';


import UsersIcon from '../../assets/icons/usersStatIcon.png';
import ActiveUsersIcon from '../../assets/icons/usersActivityIcon.png';
import LoansIcon from '../../assets/icons/userWithLoan.png';
import SavingsIcon from '../../assets/icons/usersWithSavings.png';
import Pagination from '../../components/common/Pagination';
import { useState, useEffect } from 'react';
import { getUsers } from './users.service';
import type{ UserSummary } from './users.types';


const statsData = [
  { 
    title: "Users", 
    value: "2,453", 
    icon: UsersIcon, 
  },
  { 
    title: "Active Users", 
    value: "2,453", 
    icon: ActiveUsersIcon,  
  },
  { 
    title: "Users with Loans", 
    value: "12,453", 
    icon: LoansIcon, 
  },
  { 
    title: "Users with Savings", 
    value: "102,453", 
    icon: SavingsIcon, 
  },
];

const Users = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers({
          page: currentPage,
          limit: pageSize,
        });

        setUsers(res.data);
        setTotalItems(res.total);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalItems / pageSize);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.usersPage}>
      <h1 className={styles.pageTitle}>Users</h1>

      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className={styles.tableSection}>
        <UserTable users={users} />
      </div>

      <div className={styles.paginationSection}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setCurrentPage(1);
            setPageSize(size);
          }}
        />
      </div>
    </div>
  );
};

export default Users;