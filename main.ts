let elForm: (Element | null) = document.querySelector(".todo-form")
let elInput: (Element | null) = document.querySelector(".todo-input")
let elList: (Element | null) = document.querySelector(".todo-list")
const setState = (key: string, data: any): void => {
	localStorage.setItem(key, JSON.stringify(data))
}
const getState = (key: string): any => {
	let isValid = localStorage.getItem(key)
	if (isValid) {
		return JSON.parse(isValid)
	}
}
interface ITodo {
	value: string
}
let todos: ITodo[] = getState("todos") || []
elForm?.addEventListener("submit", function (e: Event) {
	e.preventDefault()
	const data: ITodo = {
		value: (elInput as HTMLInputElement).value
	}
	todos.push(data)
	renderTodos(todos, elList);
	(elInput as HTMLInputElement).value = ""
	setState("todos", todos)
})
function renderTodos(arr: ITodo[], list: (Element | null)): void {
	(list as HTMLUListElement).innerHTML = ""
	arr.forEach((item: ITodo, index: number) => {
		let elLiItem: (Element) = document.createElement("li")
		elLiItem.className = "flex items-center justify-between p-2 border-slate-700 border-[1.5px] rounded-[12px]"
		elLiItem.innerHTML = `
		<div class="flex items-center space-x-[5px]">
			<span class="text-[18px] leading-[18px] font-medium">${index + 1}.</span>
			<strong class="text-[18px] leading-[18px] font-semibold line-clamp-1">${item.value}</strong>
		</div>
		<div class="flex items-center gap-[15px]">
			<button class="text-center bg-blue-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" type="button">Update</button>
			<button onclick="handleDeleteBtn(${index})" class="text-center bg-red-500 text-white font-semibold p-[10px] rounded-[12px] leading-[18px] duration-500 hover:cursor-pointer border-[1.5px] border-transparent hover:border-slate-700" type="button">Delete</button>
		</div>`
		list?.appendChild(elLiItem)
	})
}
renderTodos(todos, elList)
function handleDeleteBtn(id: number) {
	todos.splice(id, 1)
	renderTodos(todos, elList)
	setState("todos", todos)
}