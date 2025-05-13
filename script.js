document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    }

    // To-Do List Functionality with Local Storage
    const taskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const localStorageKey = 'todoList';

    function loadTasks() {
        const storedTasks = localStorage.getItem(localStorageKey);
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => {
                addTaskToDOM(taskText);
            });
        }
    }

    function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.textContent.replace('Delete', '').trim());
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }

    function addTaskToDOM(taskText) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        listItem.remove();
        saveTasks();
    });

    listItem.appendChild(deleteButton);

    listItem.addEventListener('click', function(event) {
        if (event.target !== deleteButton) { // Prevent editing when delete button is clicked
            const currentText = listItem.textContent.replace('Delete', '').trim();
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentText;

            listItem.textContent = ''; // Clear the list item content
            listItem.appendChild(inputField);
            inputField.focus();

            inputField.addEventListener('blur', function() {
                listItem.textContent = this.value;
                listItem.appendChild(deleteButton);
                saveTasks();
            });

            inputField.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    this.blur(); // Trigger the blur event to save
                }
            });
        } else {
            this.classList.toggle('completed'); // Toggle completed if delete button wasn't clicked
            saveTasks();
        }
    });

    taskList.appendChild(listItem);
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    loadTasks();
});