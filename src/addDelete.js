const getFromStorage = () => {
  if (localStorage.getItem('todos')) {
    return JSON.parse(localStorage.getItem('todos'));
  }
  return [];
};

// eslint-disable-next-line import/no-mutable-exports
let toDos = getFromStorage();

export const addItem = (description, toDosArr = toDos) => {
  const data = {
    description,
    completed: false,
    index: toDosArr.length + 1,
  };

  toDos.push(data);

  // Save to local storage
  localStorage.setItem('todos', JSON.stringify(toDos));
};

export const deleteItem = (index) => {
  toDos = toDos.filter((todo) => todo.index !== index);
  //   Sort the array
  const newArr = toDos.sort((a, b) => a.index - b.index);
  newArr.forEach((obj, i) => {
    obj.index = i + 1;
  });

  //   Save to local storage
  localStorage.setItem('todos', JSON.stringify(newArr));
};

export const updateTodo = (index, message, status = false) => {
  const itemToUpdate = toDos.find((item) => item.index === index);
  const todoArrIndex = itemToUpdate.index - 1;

  const initialDescription = itemToUpdate.description;

  if (message === initialDescription) return;

  itemToUpdate.description = message;
  itemToUpdate.completed = status;

  toDos[todoArrIndex] = itemToUpdate;

  //   Save to local
  localStorage.setItem('todos', JSON.stringify(toDos));
};

export default getFromStorage;
