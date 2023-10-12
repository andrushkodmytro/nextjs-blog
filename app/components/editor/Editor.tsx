'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import styles from './editor.module.css';
import { ICategory } from '@/app/models/Category';
import Image from 'next/image';

type EditorProps = {
  slug?: string;
  categories: ICategory[];
  title?: string;
  body?: string;
  categoryId?: string;
  img?: string;
};

const slugify = (str:string) =>
str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const Editor = ({
  slug = '',
  categories,
  title: initTitle = '',
  body: initBody = '',
  categoryId: initCategory = '',
  img: initImg = '',
}: EditorProps) => {
  const [title, setTitle] = useState(initTitle);
  const [category, setCategory] = useState(initCategory);
  const [img, setImg] = useState(initImg);
  const [body, setBody] = useState(initBody);

  const router = useRouter();

  const onPublish = async () => {
    try {
      const url = slug ? `/api/posts/${slug}` : `/api/add-post`;
      const res = await fetch(url, {
        method: slug ? 'PUT' : 'POST',
        body: JSON.stringify({
          title,
          slug:slugify(title),
          img,
          author: '65086447f52a24339dd2c5c0',
          categoryId: category,
          body,
        }),
      });

      if (res.status === 200 || res.status === 201 ) {
        const data = await res.json();

        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
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
        className={styles.imgInput}
        type='text'
        placeholder='Title image url (www.site/img.jpg)'
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />

      {/* <div className={styles.title}> */}
        <input
          type='textarea'
          placeholder='Title'
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      {/* </div> */}

      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme='bubble'
          value={body}
          onChange={setBody}
          placeholder='Tell your story...'
        />
      </div>
      <button className={styles.publishBtn} onClick={onPublish}>
        Publish
      </button>
    </div>
  );
};

export default Editor;
