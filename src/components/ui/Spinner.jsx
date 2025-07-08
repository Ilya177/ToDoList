import styles from '@/src/components/ui/Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading...</p>
    </div>
  );
}
