import { useState, useEffect, useRef } from 'react';
import styles from '@/src/components/ui/PriorityBadge.module.css';
import {
  PRIORITY_LABELS,
  PRIORITY_VALUES,
  DEFAULT_PRIORITY_LABEL
} from '@/src/lib/constants';

const options = Object.values(PRIORITY_LABELS);

export default function PriorityBadge({
  level = DEFAULT_PRIORITY_LABEL,
  onChange,
  editable = false,
  completed = false
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const badgeClass = completed ? 'completed' : `priority-${PRIORITY_VALUES[level]}`;

  const handleSelect = (value) => {
    setOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span
        className={`${styles.badge} ${styles[badgeClass]}`}
        onClick={() => editable && setOpen(!open)}
      >
        {level}
      </span>
      {editable && open && (
        <div className={styles.dropdown}>
          {options.map((opt) => {
            const badgeClass = `priority-${PRIORITY_VALUES[opt]}`;
            return (
              <div
                key={opt}
                className={`${styles.option} ${styles[badgeClass]}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
