import { useState, useEffect } from 'react';
import StatCard from '../../components/ui/StatCard';
import styles from '../../styles/pages/_users.module.scss';
import UserTable from '../../components/table/UserTable';
import SkeletonLoader from '../../components/ui/SkeletonLoader';
import Pagination from '../../components/common/Pagination';
import { getUsers } from './users.service';
import type { UserSummary } from './users.types';


import UsersIcon from '../../assets/icons/usersStatIcon.png';
import ActiveUsersIcon from '../../assets/icons/usersActivityIcon.png';
import LoansIcon from '../../assets/icons/userWithLoan.png';
import SavingsIcon from '../../assets/icons/usersWithSavings.png';

const statsData = [
  { title: "Users", value: "2,453", icon: UsersIcon },
  { title: "Active Users", value: "2,453", icon: ActiveUsersIcon },
  { title: "Users with Loans", value: "12,453", icon: LoansIcon },
  { title: "Users with Savings", value: "102,453", icon: SavingsIcon },
];


const TableSkeleton = () => (
  <div className="flex flex-col gap-6 w-full h-full" style={{ minHeight: '60vh' }}>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex w-full flex-col gap-4">
        <SkeletonLoader className="h-32 w-full" />
        <SkeletonLoader className="h-4 w-28" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-full" />
      </div>
    ))}
  </div>
);

const Users = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true);
        const res = await getUsers({
          page: currentPage,
          limit: pageSize,
        });

        setUsers(res.data);
        setTotalItems(res.total);
      } catch {
        setError("Failed to load users. Please check your network or API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalItems / pageSize);

 
  if (error) {
    return (
      <div className={styles.usersPage}>
        <div className="flex justify-center items-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }
  if (loading) return <TableSkeleton/>

  return (
    <div className={styles.usersPage}>
      <h1 className={styles.pageTitle}>Users</h1>
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className={styles.tableSection}>
          <>
            <UserTable users={users} />
            
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
          </>
      </div>
    </div>
  );
};

export default Users;