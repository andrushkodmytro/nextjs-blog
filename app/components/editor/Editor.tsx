'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import { ICategory } from '@/app/models/Category';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Button from '../ui/button/Button';
import styles from './editor.module.scss';

type EditorProps = {
  slug?: string;
  categories: ICategory[];
  title?: string;
  body?: string;
  categoryId?: string;
  img?: string;
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const Editor = ({
  slug = '',
  categories,
  title: initTitle = '',
  body: initBody = '',
  categoryId: initCategory = categories?.[0]._id.toString() || '',
  img: initImg = '',
}: EditorProps) => {
  const [title, setTitle] = useState(initTitle);
  const [category, setCategory] = useState(initCategory);
  const [img, setImg] = useState(initImg);
  const [body, setBody] = useState(initBody);

  const { data: session, status } = useSession();

  const router = useRouter();

  const onPublish = async () => {
    if (!session || !session?.user) {
      return null;
    }

    try {
      const url = slug ? `/api/posts/${slug}` : `/api/add-post`;
      const res = await fetch(url, {
        method: slug ? 'PUT' : 'POST',
        body: JSON.stringify({
          title,
          slug: slugify(title),
          img,
          author: session.user._id,
          categoryId: category,
          body,
        }),
      });

      if (res.status === 200 || res.status === 201) {
        const data = await res.json();

        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>{slug ? 'Edit a story' : 'Add a new story'}</h1>
        <Button className={styles.publishBtn} onClick={onPublish}>
          Publish
        </Button>
      </div>
      <select
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map(({ _id, title }) => {
          return (
            <option key={_id.toString()} value={_id.toString()}>
              {title}
            </option>
          );
        })}
      </select>

      <input
        className={styles.storyImgUrl}
        type='text'
        placeholder='Title image url (www.site/img.jpg)'
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />

      <input
        type='textarea'
        placeholder='Title'
        className={styles.storyTitle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme='bubble'
          value={body}
          onChange={setBody}
          placeholder='Tell your story...'
        />
      </div>
    </div>
  );
};

export default Editor;
