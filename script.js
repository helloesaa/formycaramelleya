const sections = document.querySelectorAll('.content');
const navItems = document.querySelectorAll('#navLinks a');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginContainer = document.querySelector('.login-container');
const mainContainer = document.querySelector('.main-container');
const navbar = document.querySelector('.navbar');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function showSection(targetId) {
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = e.target.getAttribute('data-target');
        if (targetId) {
            showSection(targetId);
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        errorMessage.textContent = 'Username dan password harus diisi.';
        return;
    }

    if (username === 'caramelleya' && password === 'iwannabewithyou') {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
        errorMessage.textContent = ''; 
    } else {
        errorMessage.textContent = 'Username atau password salah.';
    }
});

// Add Fade-in Class to Sections
sections.forEach(section => {
    section.classList.add('fade-in');
});

// Load Todos from Local Storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

// Save Todos to Local Storage
function saveTodos() {
    const todos = Array.from(todoList.children).map(li => 
        li.textContent.replace('Delete', '').trim()
    );
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add Todo to DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.textContent = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodos();
        showNotification('Tugas berhasil dihapus!', 'warning');
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

addTodoBtn.addEventListener('click', () => {
    const todo = todoInput.value.trim();
    if (todo) {
        addTodoToDOM(todo);
        saveTodos();
        todoInput.value = '';
        showNotification('Tugas berhasil ditambahkan!', 'success');
    }
});


window.onload = loadTodos;


document.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', () => {
        alert('Enjoy your mood playlist!');
    });
});


function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}


window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
