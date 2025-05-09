import { useState, useEffect } from 'react';

const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.completed) {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
};

export default function useTodos({ fetchTodos, addTodo, editTodo, deleteTodo }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    try {
      const data = await fetchTodos();
      setTodos(sortTodos(data));
    } catch (error) {
      console.log('Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  const add = async (title, priority) => {
    try {
      const newTodo = await addTodo(title, priority);
      setTodos((prev) => sortTodos([...prev, newTodo]));
    } catch (error) {
      console.log('Failed to add todo:', error);
    }
  };

  const edit = async (id, title, priority) => {
    try {
      const updated = await editTodo(id, { title, priority });
      setTodos((prev) =>
        sortTodos(prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo)))
      );
    } catch (error) {
      console.log('Failed to edit todo');
    }
  };

  const toggle = async (id, completed) => {
    try {
      const updated = await editTodo(id, { completed });
      setTodos((prev) =>
        sortTodos(prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo)))
      );
    } catch (error) {
      console.log('Failed to toggle todo');
    }
  };

  const remove = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => sortTodos(prev.filter((todo) => todo.id !== id)));
    } catch (error) {
      console.log('Failed to delete todo');
    }
  };

  return { todos, isLoading, add, edit, toggle, remove };
}