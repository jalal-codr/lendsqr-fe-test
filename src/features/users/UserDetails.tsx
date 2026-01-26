import styles from '../../styles/pages/_user-details.module.scss';
import { Link } from 'react-router-dom';
import InfoSection from '../../components/common/InfoSection';
import UserHeaderTabs from '../../components/common/UserHeaderTabs';

const UserDetails = () => {
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
      <UserHeaderTabs/>

      <div className={styles.detailsCard}>
        <InfoSection
          title="Personal Information"
          items={[
            ['FULL NAME', 'Grace Effiom'],
            ['PHONE NUMBER', '07060780922'],
            ['EMAIL ADDRESS', 'grace@gmail.com'],
            ['BVN', '07060780922'],
            ['GENDER', 'Female'],
            ['MARITAL STATUS', 'Single'],
            ['CHILDREN', 'None'],
            ['TYPE OF RESIDENCE', "Parent’s Apartment"],
          ]}
        />

        <InfoSection
          title="Education and Employment"
          items={[
            ['LEVEL OF EDUCATION', 'B.Sc'],
            ['EMPLOYMENT STATUS', 'Employed'],
            ['SECTOR OF EMPLOYMENT', 'FinTech'],
            ['DURATION OF EMPLOYMENT', '2 years'],
            ['OFFICE EMAIL', 'grace@lendsqr.com'],
            ['MONTHLY INCOME', '₦200,000.00 - ₦400,000.00'],
            ['LOAN REPAYMENT', '40,000'],
          ]}
        />

        <InfoSection
          title="Socials"
          items={[
            ['TWITTER', '@grace_effiom'],
            ['FACEBOOK', 'Grace Effiom'],
            ['INSTAGRAM', '@grace_effiom'],
          ]}
        />

        <InfoSection
          title="Guarantor"
          items={[
            ['FULL NAME', 'Debby Ogana'],
            ['PHONE NUMBER', '07060780922'],
            ['EMAIL ADDRESS', 'debby@gmail.com'],
            ['RELATIONSHIP', 'Sister'],
          ]}
        />

        <InfoSection
          items={[
            ['FULL NAME', 'Debby Ogana'],
            ['PHONE NUMBER', '07060780922'],
            ['EMAIL ADDRESS', 'debby@gmail.com'],
            ['RELATIONSHIP', 'Sister'],
          ]}
        />
      </div>
    </div>
  );
};

export default UserDetails;