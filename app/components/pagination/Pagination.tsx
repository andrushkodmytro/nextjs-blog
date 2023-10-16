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
        className='btn-secondary'
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Prev
      </button>
      <button
        className='btn-secondary'
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
