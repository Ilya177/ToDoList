import styles from '@/src/components/ui/Checkbox.module.css';

export default function Checkbox({ checked, onChange }) {
  return (
    <input type='checkbox' className={styles.input} checked={checked} onChange={onChange} />
  );
}