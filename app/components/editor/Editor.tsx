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
  categories: ICategory[];
};

const Editor = ({ categories }: EditorProps) => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [body, setBody] = useState('');

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onPublish = async () => {
    try {
      const res = await fetch(`api/add-post`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          img,
          author: '65086447f52a24339dd2c5c0',
          categoryId: '651ff24304560ccb77693916',
          body,
        }),
      });

      if (res.status === 201) {
        const data = await res.json();

        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <select className={styles.select}>
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

      <div className={styles.title}>
        <input
          type='text'
          placeholder='Title'
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

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
