const elForm = document.querySelector(".todo-form") as HTMLFormElement | null;
const elInput = document.querySelector(".todo-input") as HTMLInputElement | null;
const elList = document.querySelector(".todo-list") as HTMLUListElement | null;

const setState = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getState = (key: string): any => {
  const isValid = localStorage.getItem(key);
  if (isValid) {
    try {
      return JSON.parse(isValid);
    } catch {
      console.error("JSON parse error");
      return null;
    }
  }
  return null;
};

interface ITodo {
  value: string;
}

let todos: ITodo[] = getState("todos") || [];

elForm?.addEventListener("submit", function (e: Event) {
  e.preventDefault();
  if (elInput && elInput.value.trim() !== "") {
    const data: ITodo = {
      value: elInput.value.trim(),
    };
    todos.push(data);
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
  }
});

function renderTodos(arr: ITodo[], list: HTMLUListElement | null): void {
  if (!list) return;
  list.innerHTML = "";
  arr.forEach((item: ITodo, index: number) => {
    const elLiItem = document.createElement("li");
    elLiItem.className =
      "flex items-center justify-between p-2 border-slate-700 border-[1.5px] rounded-[12px]";
    elLiItem.innerHTML = `
      <div class="flex items-center space-x-[5px]">
        <span class="text-[18px] leading-[18px] font-medium">${index + 1}.</span>
        <strong class="todo-value text-[18px] leading-[18px] font-semibold line-clamp-1">${item.value}</strong>
      </div>
      <div class="flex items-center gap-[15px]">
        <button class="edit-btn text-center bg-yellow-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" data-id="${index}" type="button">Edit</button>
        <button class="delete-btn text-center bg-red-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" data-id="${index}" type="button">Delete</button>
      </div>`;
    list.appendChild(elLiItem);
  });

  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) =>
    btn.addEventListener("click", function (e: Event) {
      const target = e.target as HTMLButtonElement;
      const id = parseInt(target.getAttribute("data-id") || "0", 10);
      handleDeleteBtn(id);
    })
  );

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) =>
    btn.addEventListener("click", function (e: Event) {
      const target = e.target as HTMLButtonElement;
      const id = parseInt(target.getAttribute("data-id") || "0", 10);
      handleEditBtn(id);
    })
  );
}
function handleDeleteBtn(id: number): void {
  todos.splice(id, 1);
  renderTodos(todos, elList);
  setState("todos", todos);
}
function handleEditBtn(id: number): void {
  const todoValueElement = elList?.querySelectorAll(".todo-value")[id];
  if (!todoValueElement) return;

  const newValue = prompt("Edit your todo:", todos[id].value);
  if (newValue !== null && newValue.trim() !== "") {
    todos[id].value = newValue.trim();
    renderTodos(todos, elList);
    setState("todos", todos);
  }
}
renderTodos(todos, elList);
