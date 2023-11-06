import { Metadata } from 'next';
import Editor from '@/app/components/editor/Editor';
import styles from './addPost.module.scss';
import { ICategory } from '../models/Category';

export const metadata: Metadata = {
  title: 'Add new post',
  description: 'Meta blog | Add new post',
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

const AddPost = async () => {
  const { categories } = await getCategories();

  return (
    <div className={styles.addPost}>
      <Editor categories={categories} />
    </div>
  );
};

export default AddPost;
