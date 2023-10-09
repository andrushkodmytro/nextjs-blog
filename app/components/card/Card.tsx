import Image from 'next/image';
import Link from 'next/link';
import { IPost } from '@/app/models/Post';
import styles from './card.module.css';
import UserInfo from '../userInfo/UserInfo';

type CardProps = {
  post: IPost;
};

const Card = ({
  post: { title, body, author, slug, img, categoryId, createdAt },
}: CardProps) => {
  return (
    <Link href={`/posts/${slug}`} className={styles.card}>
      <div className={styles.img}>
        <Image className={styles.img} src={img} fill alt='Card' />
      </div>
      <div className={styles.cardContent}>
        <div>
          <span className={styles.tagName}>{categoryId.title}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        <UserInfo
          fullName={`${author.firstName} ${author.lastName}`}
          createdAt={createdAt}
        />
      </div>
    </Link>
  );
};

export default Card;
