const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const filterButtons = document.querySelectorAll('.filters button');

let todos = [];
let filter = 'all';

newTodoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && e.target.value.trim() !== '') {
    todos.push({ text: e.target.value.trim(), completed: false });
    e.target.value = '';
    render();
  }
});

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

function render() {
  todoList.innerHTML = '';

  const filtered = todos.filter(todo =>
    filter === 'active' ? !todo.completed :
    filter === 'completed' ? todo.completed : true
  );

  filtered.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${i})">
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${i})">×</button>
    `;
    todoList.appendChild(li);
  });

  const activeCount = todos.filter(t => !t.completed).length;
  todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    filter = btn.id.replace('filter-', '');
    render();
  });
});


render();
