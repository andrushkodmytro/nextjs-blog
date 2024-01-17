import Image from 'next/image';
import styles from './topCart.module.scss';

const TopCard = () => {
  return (
    <div className={styles.topCart}>
      <Image src='/top.jpeg' fill alt='Alt' />
      <div className={styles.content}>
        
        <h2>
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        
      </div>
    </div>
  );
};

export default TopCard;
