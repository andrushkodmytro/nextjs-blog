import React from 'react';
import styles from './userInfo.module.css';
import Image from 'next/image';

type UserInfoProps = {
  fullName: string;
  createdAt: string;
  hideAvatar?: boolean;
};

const UserInfo = ({ fullName, createdAt, hideAvatar }: UserInfoProps) => {
  const date = new Date(createdAt);

  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

  if (hideAvatar) {
    return (
      <div className={styles.userInfo}>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.date}>{dateFormatted}</div>
      </div>
    );
  }

  return (
    <div className={styles.userInfoWithAvatar}>
      <Image src={'/avatar.png'} height={24} width={24} alt={fullName} />

      <div>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.date}>{dateFormatted}</div>
      </div>
    </div>
  );
};

export default UserInfo;
