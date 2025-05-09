import { useState } from 'react';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import PriorityBadge from '@/src/components/ui/PriorityBadge';
import styles from '@/src/components/AddToDoItem.module.css';
import {
  MAX_TODO_TITLE_LENGTH,
  DEFAULT_PRIORITY_LABEL,
  PRIORITY_VALUES
} from '@/src/lib/constants';

const AddToDoItem = ({ onAdd }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState(DEFAULT_PRIORITY_LABEL);

  const addTodo = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed, PRIORITY_VALUES[newPriority]);
    setNewTitle('');
    setNewPriority(DEFAULT_PRIORITY_LABEL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <form className={styles.inputGroup} onSubmit={handleSubmit}>
      <Input
        value={newTitle}
        placeholder={`Add a new todo (max ${MAX_TODO_TITLE_LENGTH} chars)`}
        onChange={(e) => {
          if (e.target.value.length <= MAX_TODO_TITLE_LENGTH) {
            setNewTitle(e.target.value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <PriorityBadge level={newPriority}
        editable={true}
        onChange={setNewPriority}
      />
      <Button type='submit'>Add</Button>
    </form>
  );
};

export default AddToDoItem;
