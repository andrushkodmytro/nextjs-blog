'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { IComment } from '@/app/models/Comment';
import styles from './comments.module.css';
import Image from 'next/image';
import UserInfo from '../userInfo/UserInfo';

type CommentsType = {
  postSlug: string;
};

const Comments = ({ postSlug }: CommentsType) => {
  const [body, setBody] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { status, data: session } = useSession();

  useEffect(() => {
    setComments([]);
    const getData = async () => {
      try {
        const res = await fetch(`/api/comments?postSlug=${postSlug}`, {
          cache: 'no-store',
        });
        const data: IComment[] = await res.json();

        setComments(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [postSlug]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
          author: '65086447f52a24339dd2c5c0',
          body,
          postSlug,
        }),
      });

      const data: IComment = await res.json();

      setComments((prev) => [data, ...prev]);
      setBody('');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.comments}>
      <h3>Comments</h3>

      {isLoading ? (
        <p>Loading...</p>
      ) : status === 'authenticated' ? (
        <div className={styles.addComment}>
          <input
            type='textarea'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className={styles.btn} onClick={onSubmit}>
            Send
          </button>
        </div>
      ) : (
        <button className={styles.logInBtn} onClick={() => signIn()}>
          Login to write a comment
        </button>
      )}

      <div className={styles.commentsList}>
        {isLoading && <p>Loading...</p>}

        {comments.map(({ body, createdAt, author }, index: number) => {
          return (
            <div key={index} className={styles.comment}>
              <div className={styles.commentHeader}>
                <UserInfo
                  fullName={`${author.firstName} ${author.lastName}`}
                  createdAt={createdAt}
                />
              </div>
              <p>{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
