import Skeleton from '@/app/components/ui/skeleton/Skeleton';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.main}>
      <Skeleton height={500} />
      <div className={styles.postContainer}>
        <div>
          <Skeleton height={30} />
          <div className={styles.cardList}>
            {[1, 2, 3, 4].map((item) => {
              return (
                <div key={item} className={styles.card}>
                  <Skeleton height={240} />
                  <div className={styles.cardContent}>
                    <Skeleton />
                    <div className={styles.textContainer}>
                      <Skeleton /> <Skeleton />
                      <Skeleton /> <Skeleton />
                    </div>
                    <Skeleton />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.right}>
          {[1, 2, 3].map((item) => {
            return (
              <div key={item} >
                <Skeleton height={30} />
                <div className={styles.list}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
