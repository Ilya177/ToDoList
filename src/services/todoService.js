export const fetchTodos = async () => {
  const res = await fetch('/api/todos');
  return res.json();
};

export const addTodo = async (title, priority) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title, priority }),
  });
  return res.json();
};

export const editTodo = async (id, data) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
};
