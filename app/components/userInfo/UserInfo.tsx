import React from 'react';
import styles from './userInfo.module.css';
import Image from 'next/image';

type UserInfoProps = {
  fullName: string;
  createdAt: string;
};

const UserInfo = ({ fullName, createdAt }: UserInfoProps) => {
  const date = new Date(createdAt);

  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  return (
    <div className={styles.userInfo}>
      <Image src={'/avatar.png'} height={30} width={30} alt={fullName} />
      <div>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.date}>{dateFormatted}</div>
      </div>
    </div>
  );
};

export default UserInfo;
