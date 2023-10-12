import React from 'react';
import CardList from '@/app/components/cardList/CardList';
import { IPost } from '@/app/models/Post';
import styles from './categoryPosts.module.css';
import SidePanel from '@/app/components/sidePanel/SidePanel';
import { ICategory } from '@/app/models/Category';

const getData = async (
  categorySlug: string
): Promise<{ posts: IPost[]; total: number }> => {
  const res = await fetch(
    `${process.env.APP_URL}/api/posts?categorySlug=${categorySlug}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

type CategoryPostsProps = {
  params: { categorySlug: string };
  searchParams: {
    page: string;
  };
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

const CategoryPosts = async ({ params, searchParams }: CategoryPostsProps) => {
  const { categorySlug } = params;
  const page = parseInt(searchParams.page) || 1;

  const { posts, total } = await getData(categorySlug);

  const { categories } = await getCategories();

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < total;
  return (
    <div>
      <h1 className={styles.title}>{categorySlug} category</h1>
      <div className={styles.postContainer}>
        <CardList
          posts={posts}
          page={page}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
        <SidePanel posts={posts} categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPosts;
