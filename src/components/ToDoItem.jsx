import { useState, useEffect, useRef } from 'react';
import Button from '@/src/components/ui/Button';
import Checkbox from '@/src/components/ui/Checkbox';
import Input from '@/src/components/ui/Input';
import PriorityBadge from '@/src/components/ui/PriorityBadge';
import styles from '@/src/components/ToDoItem.module.css';
import {
  MAX_TODO_TITLE_LENGTH,
  PRIORITY_LABELS,
  PRIORITY_VALUES
} from '@/src/lib/constants';

const ToDoItem = ({ index, todo, onEdit, onRemove, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [priority, setPriority] = useState(PRIORITY_LABELS[todo.priority]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const startEditing = () => {
    setIsEditing(true);
    setEditingTitle(todo.title);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingTitle('');
  };

  const saveEdit = () => {
    const trimmed = editingTitle.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed, PRIORITY_VALUES[priority]);
    setIsEditing(false);
    setEditingTitle('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <li className={styles.item}>
      <div
        className={styles.itemLeft}
        onDoubleClick={() => {
          if (!isEditing) onToggle(todo.id, !todo.completed);
        }}
      >
        <span>{index})</span>
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editingTitle}
            placeholder={`Edit todo (max ${MAX_TODO_TITLE_LENGTH} chars)`}
            onChange={(e) => {
              if (e.target.value.length <= MAX_TODO_TITLE_LENGTH) {
                setEditingTitle(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo.id, !todo.completed)}
            />
            <span className={styles.checkboxCustom}></span>
            <p
              className={todo.completed ? styles.done : ''}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              {todo.title}
            </p>
          </>
        )}
      </div>

      <div className={styles.itemRight}>
        <PriorityBadge
          level={priority}
          editable={isEditing}
          onChange={setPriority}
          completed={todo.completed}
        />
        {isEditing ? (
          <Button onClick={saveEdit}>Save</Button>
        ) : (
          <>
            <Button onClick={startEditing}>Edit</Button>
            <Button onClick={() => onRemove(todo.id)}>Delete</Button>
          </>
        )}
      </div>
    </li>
  );
};

export default ToDoItem;
