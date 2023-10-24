import React from 'react';
import styles from './skeleton.module.scss';

type SkeletonProps = {
  width?: number;
  height?: number;
};

const Skeleton = ({ width, height }: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={{
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
      }}
    ></div>
  );
};

export default Skeleton;
