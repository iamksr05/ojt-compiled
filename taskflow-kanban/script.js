let tasks = [];

const addBtn = document.getElementById("add-task-btn");
addBtn.addEventListener("click", () => {
    const title = prompt("Enter task title");
    const description = prompt("Enter task description");

    if (!title) return;

    const task = {
        id: Date.now(),
        title: title,
        description: description || "",
        status: "todo"
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
});

let todo = document.getElementById("todo-tasks");
let current = document.getElementById("current-tasks");
let completed = document.getElementById("completed-tasks");

let todoCol = document.getElementById("todo-col");
let currentCol = document.getElementById("current-col");
let completedCol = document.getElementById("completed-col");

[todoCol, currentCol, completedCol].forEach(column => {
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    column.addEventListener("dragenter", () => {
        column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
    });
});

todoCol.addEventListener("drop", () => {
    todoCol.classList.remove("drag-over");
    updateTaskStatus("todo");
});
currentCol.addEventListener("drop", () => {
    currentCol.classList.remove("drag-over");
    updateTaskStatus("current");
});
completedCol.addEventListener("drop", () => {
    completedCol.classList.remove("drag-over");
    updateTaskStatus("completed");
});

fn_renderTasks_clean();

function renderTasks() {
    todo.innerHTML = "";
    current.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.draggable = true;
        taskCard.classList.add("task-card");

        taskCard.addEventListener("dragstart", () => {
            taskCard.classList.add("dragging");
            localStorage.setItem("draggedTaskId", task.id);
        });

        taskCard.addEventListener("dragend", () => {
            taskCard.classList.remove("dragging");
        });

        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="moveTask(${task.id})">Move to Current Task</button>
        `;

        if (task.status === "todo") {
            todo.appendChild(taskCard);
        }
        else if (task.status === "current") {
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="moveTask(${task.id})">Completed</button>
            `;
            current.appendChild(taskCard);
        }
        else if (task.status === "completed") {
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            completed.appendChild(taskCard);
        }
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newTitle = prompt("Edit title", task.title);
    const newDescription = prompt("Edit description", task.description);

    if(newTitle) task.title = newTitle;
    if(newDescription !== null) task.description = newDescription;

    saveTasks();
    renderTasks();
}

function moveTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task.status === "todo") {
        task.status = "current";
    }
    else if (task.status === "current") {
        task.status = "completed";
    }

    saveTasks();
    renderTasks();
}

function updateTaskStatus(newStatus){
    const draggedTaskId = Number(localStorage.getItem("draggedTaskId"));
    const task = tasks.find(task => task.id === draggedTaskId);

    if(task){
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
}

function fn_renderTasks_clean() {}

loadTasks();
renderTasks();