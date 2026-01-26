import styles from '../../styles/pages/_user-details.module.scss';
import { Link } from 'react-router-dom';
import InfoSection from '../../components/common/InfoSection';
import UserHeaderTabs from '../../components/common/UserHeaderTabs';
import { useUserDetails } from '../../hooks/useLocalStorage';

const UserDetails = () => {
  const { selectedUser } = useUserDetails();

  
  if (!selectedUser) {
    return (
      <div className={styles.wrapper}>
        <Link to="/users" className={styles.backLink}>
          ← Back to Users
        </Link>
        <div className={styles.detailsCard}>
          <p>No user selected. Please select a user from the users list.</p>
        </div>
      </div>
    );
  }

  const monthlyIncome = selectedUser.education?.monthlyIncome
    ? `₦${selectedUser.education.monthlyIncome.min.toLocaleString()} - ₦${selectedUser.education.monthlyIncome.max.toLocaleString()}`
    : 'N/A';

  const loanRepayment = selectedUser.education?.loanRepayment
    ? `₦${selectedUser.education.loanRepayment.toLocaleString()}`
    : 'N/A';

  return (
    <div className={styles.wrapper}>
      <Link to="/users" className={styles.backLink}>
        ← Back to Users
      </Link>

      <div className={styles.headerRow}>
        <h1>User Details</h1>

        <div className={styles.actions}>
          <button className={styles.blacklist}>Blacklist User</button>
          <button className={styles.activate}>Activate User</button>
        </div>
      </div>
      
      <UserHeaderTabs user={selectedUser} />

      <div className={styles.detailsCard}>
        <InfoSection
          title="Personal Information"
          items={[
            ['FULL NAME', `${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`],
            ['PHONE NUMBER', selectedUser.profile.phoneNumber || 'N/A'],
            ['EMAIL ADDRESS', selectedUser.profile.email || 'N/A'],
            ['BVN', selectedUser.profile.bvn || 'N/A'],
            ['GENDER', selectedUser.profile.gender || 'N/A'],
            ['MARITAL STATUS', selectedUser.profile.maritalStatus || 'N/A'],
            ['CHILDREN', selectedUser.profile.children?.toString() || 'None'],
            ['TYPE OF RESIDENCE', selectedUser.profile.residence || 'N/A'],
          ]}
        />

        <InfoSection
          title="Education and Employment"
          items={[
            ['LEVEL OF EDUCATION', selectedUser.education?.level || 'N/A'],
            ['EMPLOYMENT STATUS', selectedUser.education?.employmentStatus || 'N/A'],
            ['SECTOR OF EMPLOYMENT', selectedUser.education?.sector || 'N/A'],
            ['DURATION OF EMPLOYMENT', selectedUser.education?.duration || 'N/A'],
            ['OFFICE EMAIL', selectedUser.education?.officeEmail || 'N/A'],
            ['MONTHLY INCOME', monthlyIncome],
            ['LOAN REPAYMENT', loanRepayment],
          ]}
        />

        <InfoSection
          title="Socials"
          items={[
            ['TWITTER', selectedUser.socials?.twitter ? `@${selectedUser.socials.twitter}` : 'N/A'],
            ['FACEBOOK', selectedUser.socials?.facebook || 'N/A'],
            ['INSTAGRAM', selectedUser.socials?.instagram ? `@${selectedUser.socials.instagram}` : 'N/A'],
          ]}
        />

        <InfoSection
          title="Guarantor"
          items={[
            ['FULL NAME', selectedUser.guarantors?.fullName || 'N/A'],
            ['PHONE NUMBER', selectedUser.guarantors?.phoneNumber || 'N/A'],
            ['EMAIL ADDRESS', selectedUser.guarantors?.email || 'N/A'],
            ['RELATIONSHIP', selectedUser.guarantors?.relationship || 'N/A'],
          ]}
        />
      </div>
    </div>
  );
};

export default UserDetails;