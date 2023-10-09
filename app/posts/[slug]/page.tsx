import Image from 'next/image';
import Comments from '@/app/components/comments/Comments';
import { IPost } from '@/app/models/Post';
import styles from './post.module.css';
import UserInfo from '@/app/components/userInfo/UserInfo';

const getData = async (slug: string): Promise<IPost> => {
  const res = await fetch(`${process.env.APP_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
};

type PostProps = {
  params: { slug: string };
};

const Post = async ({ params }: PostProps) => {
  const { slug } = params;
  const { title, body, author, img, createdAt, categoryId } =
    await getData(slug);

  return (
    <div className={styles.post}>
      <span className={styles.category}>{categoryId.title}</span>
      <h1>{title}</h1>
      <UserInfo
        fullName={`${author.firstName} ${author.lastName}`}
        createdAt={createdAt}
      />

      <div className={styles.imgContainer}>
        <Image src={img} fill alt={title} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
      <Comments postSlug={slug} />
    </div>
  );
};

export default Post;