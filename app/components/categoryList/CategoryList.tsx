import Image from 'next/image';
import { ICategory } from '@/app/models/Category';
import styles from './categoryList.module.css';
import Link from 'next/link';

type CategoryListProps = {
  categories: ICategory[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className={styles.categories}>
      <h2>Popular Categories</h2>
      <div className={styles.categoryList}>
        {categories.map(({ title, img, bgColor, categorySlug }, index) => {
          return (
            <Link
              href={`category/${categorySlug}`}
              key={index}
              className={styles.categoryItem}
              style={{ backgroundColor: bgColor || '#ccc' }}
            >
              <Image src={img} height={30} width={30} alt={title} />
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
