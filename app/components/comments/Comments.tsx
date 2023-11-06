'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { IComment } from '@/app/models/Comment';
import UserInfo from '../userInfo/UserInfo';
import Button from '@/app/components/ui/button/Button';
import styles from './comments.module.scss';

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

      if (!session) return;

      const res = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
          author: session.user._id,
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
          <Button className={styles.btn} onClick={onSubmit}>
            Send
          </Button>
        </div>
      ) : (
        <Button
          className={styles.logInBtn}
          variant='text'
          onClick={() => signIn()}
        >
          Login to write a comment
        </Button>
      )}

      <div className={styles.commentsList}>
        {isLoading && <p>Loading...</p>}

        {!!comments.length ? (
          comments.map(({ body, createdAt, author }, index: number) => {
            return (
              <div key={index}>
                <div className={styles.commentHeader}>
                  <UserInfo
                    fullName={`${author.firstName} ${author.lastName}`}
                    createdAt={createdAt}
                    avatarUrl={author.img}
                  />
                </div>
                <p>{body}</p>
              </div>
            );
          })
        ) : (
          <p className={styles.noCommentsText}>No comments for this story</p>
        )}
        {}
      </div>
    </div>
  );
};

export default Comments;
