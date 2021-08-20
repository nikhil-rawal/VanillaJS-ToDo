//Selectors
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter__Todos");


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", check__trash__Buttons);
filterOption.addEventListener("click", filterToDo);

//Functions
function addTodo(e) {
    //Prevent Form Submission
    e.preventDefault();


    /*<div class="todo">
        <li class="todo__item"></li>
        <button class="check__Button"><i class="fas fa-check"></i></button>
        <button class="trash__Button"><i class="fas fa-trash"></i></button>
       </div>*/

    //Div for Todo List li
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Div li
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo__item");
    todoLi.innerText = todoInput.value;

    //Append li to div
    todoDiv.appendChild(todoLi);

    //Add ToDo to Local Storage
    saveTodosLocal(todoInput.value);

    //Check Button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add("check__Button");
    todoDiv.appendChild(checkBtn);

    //Trash Button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash__Button");
    todoDiv.appendChild(trashBtn);

    //Append todo -> todoList
    todoList.appendChild(todoDiv);

    //Clear todoInput field/value
    todoInput.value = "";
}

function check__trash__Buttons(e) {
    const item = e.target;

    // Use of trash button
    if (item.classList[0] === "trash__Button") {
        const currentToDo = item.parentElement;

        //Animation Ends
        currentToDo.classList.add('trash__animation');
        removeLocalTodos(currentToDo);
        currentToDo.addEventListener('transitionend', function () {
            currentToDo.remove();
        });
    }

    // Use of check button
    if (item.classList[0] === "check__Button") {
        const currentToDo = item.parentElement;
        currentToDo.classList.toggle('check__animation');
    }
}

function filterToDo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("check__animation")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("check__animation")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });

}

function saveTodosLocal(todo) {
    //Checking for already saved todo
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Div for Todo List li
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Div li
        const todoLi = document.createElement("li");
        todoLi.classList.add("todo__item");
        todoLi.innerText = todo;

        //Append li to div
        todoDiv.appendChild(todoLi);

        //Check Button
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add("check__Button");
        todoDiv.appendChild(checkBtn);

        //Trash Button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash__Button");
        todoDiv.appendChild(trashBtn);

        //Append todo -> todoList
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}