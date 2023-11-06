import Image from 'next/image';
import { ICategory } from '@/app/models/Category';
import Link from 'next/link';
import styles from './categoryList.module.scss';

type CategoryListProps = {
  categories: ICategory[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className={styles.categoryList}>
      {categories.map(({ title, img, bgColor, categorySlug }, index) => {
        return (
          <Link
            href={`/category/${categorySlug}`}
            key={index}
            className={styles.categoryItem}
            style={{ backgroundColor: bgColor || '#ccc' }}
          >
            {/* <Image src={img} height={30} width={30} alt={title} /> */}
            {title}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryList;
