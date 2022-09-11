const taskInput = document.querySelector(".wrapper .tasks-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filter span");
const clearBtn = document.querySelector(".clear-btn");
const addBtn = document.querySelector(".add-btn");
let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditedTask = false;
my();
function my() {
  let section = document.querySelector("span.active").id;
  showTodo(`${section}`);
}
clearBtn.onclick = clearAll;
function clearAll() {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  my();
}
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
    taskInput.focus();
  });
});

function showTodo(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class = "${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span>there is no task here</span>`;
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  my();
}

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}
function blur(e) {
  isEditedTask = false;
  if (!e.target.tagName == "button") {
    taskInput.value = "";
  }
  return;
}
function editTask(taskId, taskName) {
  taskInput.value = taskName;
  taskInput.focus();
  isEditedTask = true;
  editId = taskId;
  taskInput.addEventListener("blur", blur);
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  taskInput.focus();
}

window.onload = () => taskInput.focus();
taskInput.addEventListener("keyup", (e) => {
  taskInput.removeEventListener("blur", blur);

  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = [];
      }
      let taskInfo = { name: userTask, status: "pending" };
      todos.unshift(taskInfo);
    } else {
      todos[editId].name = userTask;
      isEditedTask = false;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    my();
    taskInput.value = "";
  }
});
addBtn.addEventListener("click", () => {
  taskInput.removeEventListener("blur", blur);
  let userTask = taskInput.value.trim();
  if (userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = [];
      }
      let taskInfo = { name: userTask, status: "pending" };
      todos.unshift(taskInfo);
    } else {
      todos[editId].name = userTask;
      isEditedTask = false;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    my();
    taskInput.value = "";
  }
});
