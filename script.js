document.addEventListener('DOMContentLoaded', function() {
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
                top: targetElement.offsetTop - 60, // Adjust for header height
                behavior: 'smooth'
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            listItem.addEventListener('click', function() {
                this.classList.toggle('completed');
            });

            taskList.appendChild(listItem);
            taskInput.value = ''; // Clear the input field after adding
        }
    });
});