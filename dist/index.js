import inquirer from 'inquirer';
class TodoList {
    constructor() {
        this.tasks = [];
        this.nextTaskId = 1;
    }
    addTask(description) {
        const task = {
            id: this.nextTaskId++,
            description,
            completed: false,
        };
        this.tasks.push(task);
        console.log(`Task added: ${description}`);
    }
    completeTask(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            task.completed = true;
            console.log(`Task completed: ${task.description}`);
        }
        else {
            console.log('Task not found. Please enter a valid task ID.');
        }
    }
    viewTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks in the list.');
        }
        else {
            console.log('Tasks:');
            this.tasks.forEach((task) => {
                const status = task.completed ? 'Completed' : 'Incomplete';
                console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${status}`);
            });
        }
    }
}
const todoList = new TodoList();
function showMainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices: ['Add Task', 'Complete Task', 'View Tasks', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case 'Add Task':
                addTask();
                break;
            case 'Complete Task':
                completeTask();
                break;
            case 'View Tasks':
                viewTasks();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
                break;
        }
    });
}
function addTask() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Enter task description:',
        },
    ])
        .then((answers) => {
        const description = answers.description;
        todoList.addTask(description);
        showMainMenu();
    });
}
function completeTask() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'taskId',
            message: 'Enter the task ID to mark as complete:',
        },
    ])
        .then((answers) => {
        const taskId = parseInt(answers.taskId, 10);
        if (!isNaN(taskId)) {
            todoList.completeTask(taskId);
            showMainMenu();
        }
        else {
            console.log('Invalid task ID. Please enter a valid numeric task ID.');
            completeTask();
        }
    });
}
function viewTasks() {
    todoList.viewTasks();
    showMainMenu();
}
console.log('Welcome to the Todo List App!');
showMainMenu();
