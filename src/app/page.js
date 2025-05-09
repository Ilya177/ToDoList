'use client';

import Spinner from '@/src/components/ui/Spinner';
import ToDoList from '@/src/components/ToDoList';
import styles from '@/src/app/styles/page.module.css';
import useTodos from '@/src/hooks/useTodos';
import {
  fetchTodos as fetchTodosApi,
  addTodo,
  editTodo,
  deleteTodo
} from '@/src/services/todoService';

export default function Home() {
  const {
    todos,
    isLoading,
    add,
    edit,
    toggle,
    remove
  } = useTodos({
    fetchTodos: fetchTodosApi,
    addTodo,
    editTodo,
    deleteTodo
  });

  if (isLoading) return <Spinner />;

  return (
    <main className={styles.wrapper}>
      <ToDoList
        todos={todos}
        onAdd={add}
        onEdit={edit}
        onRemove={remove}
        onToggle={toggle}
      />
    </main>
  );
}
