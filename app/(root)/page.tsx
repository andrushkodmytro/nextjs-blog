import { Metadata } from 'next';
import TopCard from '@/app/components/topCard/TopCard';
import CardList from '@/app/components/cardList/CardList';
import { IPost } from '@/app/models/Post';
import { ICategory } from '@/app/models/Category';
import SidePanel from '../components/sidePanel/SidePanel';
import styles from './page.module.scss';
import { POST_PER_PAGE } from '../utils/constants';

const getPosts = async (
  page: number
): Promise<{ posts: IPost[]; total: number }> => {
  const res = await fetch(`${process.env.APP_URL}/api/posts?page=${page}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
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

type HomeProps = {
  searchParams: any;
};

export const metadata: Metadata = {
  title: 'Meta blog',
  description: 'Meta blog Home page',
};

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page) || 1;
  const { posts, total } = await getPosts(page);

  const { categories } = await getCategories();

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < total;

  return (
    <div className={styles.main}>
      <TopCard />
      
      <div className={styles.postContainer}>
        <CardList
          posts={posts}
          page={page}
          hasPrev={hasPrev}
          hasNext={hasNext}
          total={total}
        />
        <SidePanel posts={posts} categories={categories} />
      </div>
    </div>
  );
}
