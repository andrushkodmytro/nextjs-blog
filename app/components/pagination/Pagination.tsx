'use client';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/button/Button';
import styles from './pagination.module.scss';

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination = ({ page = 1, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();
  return (
    <div className={styles.pagination}>
      <Button
        variant='outlined'
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Prev
      </Button>
      <Button
        variant='outlined'
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
