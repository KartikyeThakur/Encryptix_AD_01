// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage (if available)
let tasks = [];
loadTasks(); // Load from storage

// Add Task Function
addTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if (newTask !== "") {
        tasks.push({ text: newTask, completed: false }); // Add new task object
        renderTasks();
        taskInput.value = ""; // Clear input field
        saveTasks(); // Save tasks to local storage
    }
});

// Render Tasks Function
function renderTasks() {
    taskList.innerHTML = ""; // Clear existing list

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" data-index="${index}">
                    ${task.completed ? 'Uncomplete' : 'Complete'}
                </button>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    // Event Listeners for Task Buttons
    const completeBtns = document.querySelectorAll('.complete-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');

    completeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            saveTasks(); // Save updated tasks
        });
    });

    editBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            const newText = prompt("Edit task:", tasks[index].text);
            if (newText !== null) {
                tasks[index].text = newText;
                renderTasks();
                saveTasks(); // Save updated tasks
            }
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            tasks.splice(index, 1);
            renderTasks();
            saveTasks(); // Save updated tasks
        });
    });
}

// Save Tasks to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Initial Rendering
renderTasks();
