import styles from '../../styles/pages/_user-details.module.scss';

interface InfoSectionProps {
  title?: string;
  items: [string, string][];
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, items }) => {
  return (
    <div className={styles.infoSection}>
      {title && <h4>{title}</h4>}

      <div className={styles.grid}>
        {items.map(([label, value]) => (
          <div key={label} className={styles.item}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;