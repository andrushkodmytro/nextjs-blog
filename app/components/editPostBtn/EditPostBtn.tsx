'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styles from './editPostBtn.module.scss';

type EditPostBtnProps = {
  authorId: string;
  slug: string;
};

export default function EditPostBtn({ authorId, slug }: EditPostBtnProps) {
  const { data: session } = useSession();
  return (
    <>
      {authorId === session?.user?._id && (
        <Link
          href={`/edit/${slug}`}
          className={`btn-secondary ${styles.editLink}`}
        >
          Edit story
        </Link>
      )}
    </>
  );
}
