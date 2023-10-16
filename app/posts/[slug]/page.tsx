import Image from 'next/image';
import Comments from '@/app/components/comments/Comments';
import { IPost } from '@/app/models/Post';
import styles from './post.module.css';
import UserInfo from '@/app/components/userInfo/UserInfo';
import Link from 'next/link';

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
      <h1>{title}</h1>
      <div className={styles.postTop}>
        <UserInfo
          fullName={`${author.firstName} ${author.lastName}`}
          createdAt={createdAt}
          avatarUrl={author.img}
        />
        <span className={styles.category}>{categoryId.title}</span>

        <Link
          href={`/edit/${slug}`}
          className={`btn-secondary ${styles.editLink}`}
        >
          Edit story
        </Link>
      </div>

      <div className={styles.imgContainer}>
        <Image src={img} fill alt={title} />
      </div>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
      <Comments postSlug={slug} />
    </div>
  );
};

export default Post;
