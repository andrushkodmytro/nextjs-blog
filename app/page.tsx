import { Metadata } from 'next';
import TopCard from '@/app/components/topCard/TopCard';
import CategoryList from '@/app/components/categoryList/CategoryList';
import CardList from '@/app/components/cardList/CardList';
import { IPost } from '@/app/models/Post';
import { ICategory } from '@/app/models/Category';
import styles from './page.module.css';
import SidePanel from './components/sidePanel/SidePanel';

const getData = async (
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
  const { posts, total } = await getData(page);

  const { categories } = await getCategories();

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < total;

  return (
    <div className={styles.main}>
      <TopCard />
      <CategoryList categories={categories} />
      <div className={styles.postContainer}>
        <CardList
          posts={posts}
          page={page}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
        <SidePanel />
      </div>
    </div>
  );
}
