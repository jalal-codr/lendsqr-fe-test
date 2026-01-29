import styles from '../../styles/pages/_user-details.module.scss';

interface InfoSectionProps {
  title?: string;
  items: [string, string][];
  columns?: number;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  items,
  columns = 4,
}) => {
  return (
    <div className={styles.infoSection}>
      {title && <span className={styles.info_span}>{title}</span>}

      <div
        className={styles.grid}
        style={{ '--columns': columns } as React.CSSProperties}
      >
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