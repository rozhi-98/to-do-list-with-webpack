import './style.css';
import { checkoffItem } from './interactiveList.js';
import getToDos, { addItem, deleteItem, updateTodo } from './addDelete.js';

const todoContainer = document.querySelector('.todo-list');
const clearListBtn = document.querySelector('.btn-clear');

const generateMarkup = (data) => {
  return `<li class="todo" data-index="${data.index}" data-completed="${data.completed}"> 
  <label for="${data.index}"> <input type="checkbox" class="checkbox"></label>
  <input type="text" id="${data.index}" class="item-description-input" name="${data.index}" value="${data.description}">
   <div class="fa-list-icon"><i
  class="fa-solid fa-ellipsis-vertical"></i></div> 
  </li>`;
};

const createList = (arr) => {
  let listString = '';

  const sortedArr = arr.sort((a, b) => a.index - b.index);

  sortedArr.forEach((item) => {
    listString += generateMarkup(item);
  });

  todoContainer.innerHTML = listString;
};

// Add to do
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const { value } = e.target;

    if (!value?.trim()) return;

    if (e.target.classList.contains('add-todo-input')) {
      addItem(value);
      // Empty input
      e.target.value = '';
      createList(getToDos());
      return;
    }

    if (e.target.classList.contains('item-description-input')) {
      const parentEl = e.target.closest('.todo');

      const { index } = parentEl.dataset;

      updateTodo(+index, value);
      createList(getToDos());
    }
  }
});

// Deleting
todoContainer.addEventListener('click', (e) => {
  const itemSelected = e.target.closest('.fa-list-icon');

  if (!itemSelected) return;

  itemSelected
    .querySelector('.fa-solid')
    .classList.remove('fa-ellipsis-vertical');

  itemSelected.querySelector('.fa-solid').classList.add('fa-trash-can');

  const trashIcon = itemSelected.querySelector('.fa-trash-can');

  trashIcon?.addEventListener('click', () => {
    const parentEle = trashIcon.closest('.todo');
    const { index } = parentEle.dataset;

    deleteItem(+index);
    createList(getToDos());
  });
});

let indexesToRemove = [];

todoContainer.addEventListener('click', (e) => {
  const activeEl = e.target.closest('.checkbox');
  if (!activeEl) return;
  const parentEl = activeEl.closest('.todo');

  indexesToRemove = checkoffItem(parentEl);
});

clearListBtn.addEventListener('click', () => {
  if (indexesToRemove.length > 0) {
    indexesToRemove.forEach((i) => {
      deleteItem(i);
    });
    createList(getToDos());
  }

  // Reset indexesToRemove arr
  indexesToRemove = [];
});
