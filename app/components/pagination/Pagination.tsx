'use client';

import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination = ({ page = 1, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();
  return (
    <div className={styles.pagination}>
      <button
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Prev
      </button>
      <button
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
