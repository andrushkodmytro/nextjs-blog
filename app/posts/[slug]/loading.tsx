import Skeleton from '@/app/components/ui/skeleton/Skeleton';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.page}>
      <Skeleton height={40} />
      <div className={styles.infoBlock}>
        <Skeleton width={200} height={36} />
        <Skeleton width={150} height={36} />
      </div>
      <Skeleton height={462} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
