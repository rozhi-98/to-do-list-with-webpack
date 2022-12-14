import "./style.css";
import getToDos, { addItem, deleteItem, updateTodo } from "./addDelete.js";

const todoContainer = document.querySelector(".todo-list");

const generateMarkup = (data) => {
  return `<li class="todo" data-index="${data.index}" data-completed="${data.completed}"> 
  <label for="${data.index}"> <i class="fa-regular fa-square"></i> </label>
  <input type="text" id="${data.index}" class="item-description-input" name="${data.index}" value="${data.description}">
   <div class="fa-list-icon"><i
  class="fa-solid fa-ellipsis-vertical"></i></div> 
  </li>`;
};

const createList = (arr) => {
  let listString = "";

  const sortedArr = arr.sort((a, b) => a.index - b.index);

  sortedArr.forEach((item) => {
    listString += generateMarkup(item);
  });

  todoContainer.innerHTML = listString;
};

// Add to do
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const { value } = e.target;

    if (!value?.trim()) return;

    if (e.target.classList.contains("add-todo-input")) {
      addItem(value);
      // Empty input
      e.target.value = "";
      createList(getToDos());
      return;
    }

    if (e.target.classList.contains("item-description-input")) {
      const parentEl = e.target.closest(".todo");

      const { index } = parentEl.dataset;

      updateTodo(+index, value);
      createList(getToDos());
    }
  }
});

// Deleting
todoContainer.addEventListener("click", (e) => {
  const itemSelected = e.target.closest(".fa-list-icon");

  if (!itemSelected) return;

  itemSelected
    .querySelector(".fa-solid")
    .classList.remove("fa-ellipsis-vertical");

  itemSelected.querySelector(".fa-solid").classList.add("fa-trash-can");

  const trashIcon = itemSelected.querySelector(".fa-trash-can");

  trashIcon?.addEventListener("click", () => {
    const parentEle = trashIcon.closest(".todo");
    const { index } = parentEle.dataset;

    deleteItem(+index);
    createList(getToDos());
  });
});