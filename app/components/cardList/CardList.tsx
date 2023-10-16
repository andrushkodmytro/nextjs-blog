import Card from '@/app/components/card/Card';
import { IPost } from '@/app/models/Post';
import Pagination from '@/app/components/pagination/Pagination';
import styles from './cardList.module.css';

type CardListProps = {
  posts: IPost[];
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const CardList = ({ posts, page, hasPrev, hasNext }: CardListProps) => {
  return (
    <div className={styles.cardList}>
      <h2 >Recent posts</h2>
      <div className={styles.list}>
        {posts.map((post, index) => {
          return <Card key={index} post={post} />;
        })}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
