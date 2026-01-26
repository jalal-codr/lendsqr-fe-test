import { useState } from 'react';
import styles from '../../styles/pages/_user-details.module.scss';

import avatarIcon from '../../assets/icons/avatar.png';
import star from '../../assets/icons/np_star.png';
import starOutline from '../../assets/icons/np_star_1.png';

const TABS = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
] as const;

type UserTab = (typeof TABS)[number];

const UserHeaderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('General Details');

  return (
    <div className={styles.userHeaderTabs}>
      {/* ---------- HEADER ---------- */}
      <div className={styles.userHeader}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src={avatarIcon} alt="User avatar" />
          </div>

          <div>
            <h2>Grace Effiom</h2>
            <p>LSQF587g90</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.tier}>
          <span>User’s Tier</span>
          <div>
            <img src={star} alt="Filled star" />
            <img src={starOutline} alt="Empty star" />
            <img src={starOutline} alt="Empty star" />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.balance}>
          <h3>₦200,000.00</h3>
          <p>9912345678 / Providus Bank</p>
        </div>
      </div>

      {/* ---------- TABS ---------- */}
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