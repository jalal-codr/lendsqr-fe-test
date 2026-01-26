import React from 'react';
import styles from '../../styles/components/_StatCard.module.scss';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value}) => {
  return (
    <div className={styles.card}>
      <div 
        className={styles.iconWrapper} 
      >
        <img src={icon} alt={title} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default StatCard;