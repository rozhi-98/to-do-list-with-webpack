import "./style.css";

const todoContainer = document.querySelector(".todo-list");

const toDoItems = [
  {
    description: "wash the car",
    completed: false,
    index: 0,
  },
  {
    description: "do homework",
    completed: false,
    index: 1,
  },
  {
    description: "visit grandparents",
    completed: false,
    index: 2,
  },
];

const generateMarkupGen = (data) => {
  return `<li class="todo" data-index="${data.index}" data-completed="${data.completed}"> 
  <input type="checkbox" id="${data.index}" name="${data.index}" value="Bike">
  <label for="${data.index}"> ${data.description} <i
          class="fa-list-icon fa-solid fa-ellipsis-vertical"></i></label>
  </li>`;
};

const createList = (arr) => {
  let listString = "";

  const sortedArr = arr.sort((a, b) => a.index - b.index);

  sortedArr.forEach((item) => {
    listString += generateMarkupGen(item);
  });

  todoContainer.innerHTML = listString;
};

createList(toDoItems);