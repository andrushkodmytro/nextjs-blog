import React from 'react';
import UserInfo from '../userInfo/UserInfo';
import styles from './cardSmall.module.css';
import { ICategory } from '@/app/models/Category';
import { IUser } from '@/app/models/User';

type CardSmallProps = {
  title: string;
  categoryId: ICategory;
  author: IUser;
  createdAt: string;
};

const CardSmall = ({ title, categoryId, createdAt, author }: CardSmallProps) => {
  return (
    <div className={styles.cardSmall}>
      <div
        className={styles.tag}
        style={{ backgroundColor: categoryId.bgColor }}
      >
        {categoryId.title}
      </div>
      <h3>{title}</h3>

      <UserInfo
        fullName={`${author.firstName} ${author.lastName}`}
        createdAt={createdAt}
        hideAvatar={true}
      />
    </div>
  );
};

export default CardSmall;
