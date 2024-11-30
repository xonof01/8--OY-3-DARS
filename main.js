"use strict";
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
const setState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        return JSON.parse(isValid);
    }
};
let todos = getState("todos") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        value: elInput.value
    };
    todos.push(data);
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
});
function renderTodos(arr, list) {
    list.innerHTML = "";
    arr.forEach((item, index) => {
        let elLiItem = document.createElement("li");
        elLiItem.className = "flex items-center justify-between p-2 border-slate-700 border-[1.5px] rounded-[12px]";
        elLiItem.innerHTML = `
		<div class="flex items-center space-x-[5px]">
			<span class="text-[18px] leading-[18px] font-medium">${index + 1}.</span>
			<strong class="text-[18px] leading-[18px] font-semibold line-clamp-1">${item.value}</strong>
		</div>
		<div class="flex items-center gap-[15px]">
			<button class="text-center bg-blue-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" type="button">Update</button>
			<button onclick="handleDeleteBtn(${index})" class="text-center bg-red-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" type="button">Delete</button>
		</div>`;
        list === null || list === void 0 ? void 0 : list.appendChild(elLiItem);
    });
}
renderTodos(todos, elList);
function handleDeleteBtn(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
