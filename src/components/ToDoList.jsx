import AddToDoItem from '@/src/components/AddToDoItem';
import ToDoItem from '@/src/components/ToDoItem';
import styles from '@/src/components/ToDoList.module.css';

const ToDoList = ({ todos, onAdd, onEdit, onRemove, onToggle }) => {
  return (
    <div className={styles.container}>
      <AddToDoItem onAdd={onAdd} />
      <ul className={styles.list}>
        {todos.map((todo, index) => (
          <ToDoItem key={todo.id}
            index={index + 1}
            todo={todo}
            onEdit={onEdit}
            onRemove={onRemove}
            onToggle={onToggle} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
