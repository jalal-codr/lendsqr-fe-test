import React, { useState } from 'react';
import styles from '../../styles/pages/_user-details.module.scss';
import avatarIcon from '../../assets/icons/avatar.png';
import star from '../../assets/icons/np_star.png';
import starOutline from '../../assets/icons/np_star_1.png';
import type{ UserDetails } from '../../features/users/users.types';

const TABS = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
] as const;

type UserTab = (typeof TABS)[number];

interface UserHeaderTabsProps {
  user: UserDetails;
}

const UserHeaderTabs: React.FC<UserHeaderTabsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<UserTab>('General Details');

  // Helper to render stars based on account.tier (1, 2, or 3)
  const renderStars = () => {
    const tier = user.account.tier || 1;
    return [1, 2, 3].map((index) => (
      <img 
        key={index} 
        src={index <= tier ? star : starOutline} 
        alt={index <= tier ? "Filled star" : "Empty star"} 
      />
    ));
  };

  return (
    <div className={styles.userHeaderTabs}>
      <div className={styles.userHeader}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src={avatarIcon} alt={`${user.profile.firstName} avatar`} />
          </div>

          <div>
            <span className={styles.pUserName}>{`${user.profile.firstName} ${user.profile.lastName}`}</span>
            <p>{user.id.split('-')[0].toUpperCase()}</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.tier}>
          <span>User’s Tier</span>
          <div>
            {renderStars()}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.balance}>
          <span className={styles.pUserName}>₦{user.account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <p>{user.account.accountNumber} / {user.account.bankName}</p>
        </div>
      </div>
      <div className={styles.tabs}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <span
              key={tab}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveTab(tab);
                }
              }}
              className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
            >
              {tab}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default UserHeaderTabs;