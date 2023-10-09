import Image from 'next/image';
import styles from './topCart.module.css';

const TopCard = () => {
  return (
    <div className={styles.topCart}>
      <Image src='/top.jpeg' fill alt='Alt' />
      <div className={styles.content}>
        <span> HTML</span>
        <h2>
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        <div>
          <Image src='/top.jpeg' width={40} height={40} alt='Alt' />
          <span>Tracey Wilson</span>
          <span>August 20, 2022</span>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
