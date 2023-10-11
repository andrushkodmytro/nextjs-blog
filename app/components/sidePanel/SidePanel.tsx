import React from 'react';
import CardSmall from '@/app/components/cardSmall/CardSmall';
import { IPost } from '@/app/models/Post';

import styles from './sidePanel.module.css';
import CategoryList from '../categoryList/CategoryList';
import { ICategory } from '@/app/models/Category';

type SidePanelProps = {
  posts: IPost[];
  categories: ICategory[];
};

const SidePanel = async ({ posts, categories }: SidePanelProps) => {
  return (
    <div className={styles.sidePanel}>
      <div>
        <h2>Most popular</h2>
        <ul>
          {posts.map(({ _id, title, categoryId, author, createdAt }) => {
            return (
              <CardSmall
                key={_id.toString()}
                title={title}
                categoryId={categoryId}
                author={author}
                createdAt={createdAt}
              />
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Categories</h2>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default SidePanel;
