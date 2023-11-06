import React from 'react';
import Image from 'next/image';
import styles from './userInfo.module.scss';

type UserInfoProps = {
  fullName: string;
  createdAt: string;
  avatarUrl?: string;
  hideAvatar?: boolean;
};

const UserInfo = ({
  fullName,
  createdAt,
  avatarUrl,
  hideAvatar,
}: UserInfoProps) => {
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
      <Image
        src={avatarUrl ? avatarUrl : '/avatar.png'}
        height={30}
        width={30}
        alt={fullName}
      />

      <div>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.date}>{dateFormatted}</div>
      </div>
    </div>
  );
};

export default UserInfo;
