import { Metadata } from 'next';
import Editor from '@/app/components/editor/Editor';
import styles from './addPost.module.css';
import { ICategory } from '../../models/Category';
import { IPost } from '@/app/models/Post';

export const metadata: Metadata = {
  title: 'Add new post',
  description: 'Meta blog | Add new post',
};

const getPost = async (slug: string): Promise<IPost> => {
  const res = await fetch(`${process.env.APP_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
};

const getCategories = async (): Promise<{ categories: ICategory[] }> => {
  const res = await fetch(`${process.env.APP_URL}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

type EditPostProps = {
  params: { slug: string };
};
const EditPost = async ({ params }: EditPostProps) => {
  const { slug } = params;
  const { title, body, img, categoryId } = await getPost(slug);

  const { categories } = await getCategories();

  return (
    <div className={styles.addPost}>
      <Editor
        slug={slug}
        categories={categories}
        title={title}
        body={body}
        categoryId={categoryId._id.toString()}
        img={img}
      />
    </div>
  );
};

export default EditPost;
