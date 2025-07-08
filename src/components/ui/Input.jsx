import { forwardRef } from 'react';
import styles from '@/src/components/ui/Input.module.css';

const Input = forwardRef(({ ...props }, ref) => {
  return <input type='text' ref={ref} className={styles.input} {...props} />;
});

Input.displayName = 'Input';

export default Input;