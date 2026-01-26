import React from 'react';
import styles from '../../styles/abstracts/_skeletonLoader.module.scss';

interface SkeletonProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ className = '' }) => {
  const skeletonClass = `${styles.skeletonBase} ${className}`;

  return <div className={skeletonClass} />;
};

export default SkeletonLoader;