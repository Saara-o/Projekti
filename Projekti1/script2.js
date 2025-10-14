const uusitodo = document.getElementById('uusi-todo');
const todolista = document.getElementById('todo-lista');
const todoMr = document.getElementById('todo-maara');
const filtteriBtn = document.querySelectorAll('.filtterien napit');

let todos = [];
let filter = 'all';

uusitodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && e.target.value.trim() !== '') {
    todos.push({ text: e.target.value.trim(), completed: false });
    e.target.value = '';
    render();
  }
});

// tehtävät muutetaan tehdyiksi
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

// poistetaan todo-listalta tehtäviä
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

// todo-lista
function render() {
  todoList.innerHTML = '';

  const filtteröity = todos.filter(todo =>
    filter === 'aktiivi' ? !todo.completed :
    filter === 'tehty' ? todo.completed : true
  );
  // lisää listaan näkyviin tehtäviä
  filtteröity.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('tehty');

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${i})">
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${i})">×</button>
    `;
    todolista.appendChild(li);
  });

  const aktiiviMr = todos.filter(t => !t.completed).length;
  todoMr.textContent = `${aktiiviMr} item${aktiiviMr !== 1 ? 's' : ''} left`;
}

// muuttaa näppäimet All, Active, Completed musta/punainen sen mukaan, mikä niistä on aktiivinen
filtteriBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    filtteriBtn.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    filter = btn.id.replace('filtteri-', ''); 
    render();
  });
});


render();