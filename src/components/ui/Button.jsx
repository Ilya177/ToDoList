import styles from '@/src/components/ui/Button.module.css';

export default function Button({ children, onClick, ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}