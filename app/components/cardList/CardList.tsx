import Card from '@/app/components/card/Card';
import { IPost } from '@/app/models/Post';
import Pagination from '@/app/components/pagination/Pagination';
import styles from './cardList.module.scss';

type CardListProps = {
  posts: IPost[];
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  total: number;
};

const CardList = ({
  posts,
  page,
  hasPrev,
  hasNext,
  total = 0,
}: CardListProps) => {
  return (
    <div className={styles.cardList}>
      <h2>Recent posts: {total}</h2>
      <div className={styles.list}>
        {posts.length ? (
          posts.map((post, index) => {
            return <Card key={index} post={post} />;
          })
        ) : (
          <p className={styles.noCardsText}>No available post</p>
        )}
      </div>
      {(hasPrev || hasNext) && (
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      )}
    </div>
  );
};

export default CardList;
