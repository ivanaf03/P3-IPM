function addTask() {
    var newTaskInput = document.getElementById("newTaskInput");
    var descriptionInput = document.getElementById("descriptionInput");
    var taskDateInput = document.getElementById("taskDate");
    var taskList = document.getElementById("taskList");

    var addButton = document.querySelector('button[aria-label="Add Task"]');
    if (addButton) {
        addButton.setAttribute('aria-pressed', 'true');
    }

    if (newTaskInput.value.trim() === "") {
        showCustomAlert("Please, add a new task");
        return;
    }

    var task = document.createElement("div");
    task.className = "task";
    task.setAttribute('role', 'list-item');

    var taskId = "task" + Date.now();
    task.id = taskId;

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-task-btn center";
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteButton.onclick = function() {
        deleteTask(taskId);
    };
    task.appendChild(deleteButton);
    deleteButton.setAttribute('aria-label', 'Delete Task');
    deleteButton.setAttribute('aria-pressed', 'false');

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox-" + taskId;
    checkbox.className = "task-checkbox";
    task.appendChild(checkbox);

    var taskText = document.createElement("label");
    taskText.textContent = newTaskInput.value;
    taskText.setAttribute("for", "checkbox-" + taskId);
    taskText.style.fontWeight = "bold"; 
    task.appendChild(taskText);

    if (taskDateInput.value) {
        var dateDisplay = document.createElement("p");
        dateDisplay.textContent = "Task date: " + taskDateInput.value;
        task.appendChild(dateDisplay);
    }

    if (descriptionInput.value.trim() !== "") {
        var description = document.createElement("p");
        description.textContent = descriptionInput.value;
        task.appendChild(description);
    }

    taskList.appendChild(task);
    newTaskInput.value = "";
    descriptionInput.value = "";
    taskDateInput.value = "";
    var addButton = document.querySelector('button[aria-label="Add Task"]');
    if (addButton) {
        addButton.setAttribute('aria-pressed', 'false');
    }
}


function deleteTask(taskId) {
    var taskToDelete = document.getElementById(taskId);
    if (taskToDelete) {
        var deleteButton = taskToDelete.querySelector('.delete-task-btn');
        if (deleteButton) {
            deleteButton.setAttribute('aria-pressed', 'true');
        }
        taskToDelete.remove();
    }
}

function showCustomAlert(message) {
    var customAlert = document.getElementById("customAlert");
    var alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    customAlert.style.display = "block";
}

function closeCustomAlert() {
    var customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none";
}

function markAllTasks() {
    var tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        var checkbox = task.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    var markAllButton = document.querySelector('button[onclick="markAllTasks"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
}

function deleteAllTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    var markAllButton = document.querySelector('button[onclick="deleteAllTasks"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'trye');
    }
}

function toggleMenu() {
    var toolbar = document.querySelector('.toolbar');
    toolbar.classList.toggle('show-menu');
    var menuButton = document.querySelector('.menu-btn');
    if (menuButton) {
        var isMenuOpen = toolbar.classList.contains('show-menu');
        menuButton.setAttribute('aria-pressed', isMenuOpen.toString());
    }
}

function changeMotivationText() {
    var motivationText = document.getElementById('motivation');
    var texts = [
        '✨Attitude is the key. It\'s what makes the difference in life. - Clement Stone✨',
        '✨The only way to do great work is to love what you do. - Steve Jobs✨',
        '✨Believe you can and you\'re halfway there. - Theodore Roosevelt✨',
        '✨Our greatest glory is not in never falling, but in rising every time we fall. - Confucius✨',
        '✨The secret to getting ahead is getting started. - Mark Twain✨',
        '✨Motivation gets you started, habit keeps you going. - Jim Rohn✨',
        '✨There is no path to success, success is the path. - Buddha✨',
        '✨The only place where success comes before work is in the dictionary. - Vidal Sassoon✨',
        '✨Make each day your masterpiece. - John Wooden✨',
        '✨The only way to do great work is to love what you do. - Steve Jobs✨',
        '✨Don\'t count your life by the number of breaths you take, but by the moments that take your breath away. - Unknown✨',
        '✨If you can dream it, you can do it. - Walt Disney✨',
        '✨Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill✨',
        '✨The true measure of success is how many times you can bounce back after falling. - Stephen Richards✨',
        '✨Nothing in the world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. - Calvin Coolidge✨',
        '✨Luck is what happens when preparation meets opportunity. - Seneca✨',
        '✨Your life doesn\'t get better by chance, it gets better by change. - Jim Rohn✨',
        '✨The only way to do a great job is to love what you do. - Steve Jobs✨',
        '✨What you define, limits you. Define your success, not your failures. - Unknown✨',
        '✨The difference between a successful person and others is not lack of strength, not lack of knowledge, but rather a lack in will. - Vince Lombardi✨',
        '✨Make each day your masterpiece. - John Wooden✨',
        '✨True success is finding your purpose and releasing your potential to achieve it. - Unknown✨',
        '✨No matter how slow you go, as long as you do not stop. - Confucius✨',
        '✨Believe in yourself and everything is possible. - Theodore Roosevelt✨',
        '✨What you do today can improve all your tomorrows. - Ralph Marston✨',
        '✨Do today what others won\'t, do tomorrow what others can\'t. - Jerry Rice✨',
        '✨Never stop trying, because where there is life, there is hope. - Unknown✨',
        '✨Believe you can and you\'ve already come halfway. - Theodore Roosevelt✨',
        '✨Attitude is a little thing that makes a big difference. - Winston Churchill✨',
        '✨Do more than you think is possible. - Unknown✨',
        '✨Sometimes adversity is what you need to face to realize how lucky you are. - Unknown✨'
    ];
    var index = 0;
    setInterval(function() {
        motivationText.value = texts[index];
        index = (index + 1) % texts.length;
    }, 4000);
}

window.onload = function() {
    changeMotivationText();
};

function sortTasksByDate() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        var dateA = getDateFromTask(a);
        var dateB = getDateFromTask(b);

        if (dateA && dateB) {
            return dateA - dateB;
        } else {
            return 0;
        }
    });

    taskList.innerHTML = ""; 
    tasks.forEach(function(task) {
        taskList.appendChild(task);
    });
    var markAllButton = document.querySelector('button[onclick="sortTasksByDate"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
}

function getDateFromTask(task) {
    var dateElement = task.querySelector('p');
    if (dateElement) {
        var dateString = dateElement.textContent.replace("Task date: ", "");
        return new Date(dateString);
    }
    return null;
}

function unmarkAllTasks() {
    var tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        var checkbox = task.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    var markAllButton = document.querySelector('button[onclick="unmarkAllTasks"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
}

function deleteOldTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children);

    tasks.forEach(function(task) {
        var date = getDateFromTask(task);

        if (date && date < new Date()) {
            task.remove();
        }
    });
    var markAllButton = document.querySelector('button[onclick="deleteOldTasks"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
    
}

function sortCompletedFirst() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        var isCompletedA = a.querySelector('.task-checkbox').checked;
        var isCompletedB = b.querySelector('.task-checkbox').checked;

        if (isCompletedA && !isCompletedB) {
            return -1;
        } else if (!isCompletedA && isCompletedB) {
            return 1;
        } else {
            return 0;
        }
    });

    taskList.innerHTML = "";
    tasks.forEach(function(task) {
        taskList.appendChild(task);
    });
    var markAllButton = document.querySelector('button[onclick="sortCompletedFirst"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
}

function sortUncompletedFirst() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        var isCompletedA = a.querySelector('.task-checkbox').checked;
        var isCompletedB = b.querySelector('.task-checkbox').checked;

        if (!isCompletedA && isCompletedB) {
            return -1;
        } else if (isCompletedA && !isCompletedB) {
            return 1;
        } else {
            return 0;
        }
    });

    taskList.innerHTML = "";
    tasks.forEach(function(task) {
        taskList.appendChild(task);
    });
    var markAllButton = document.querySelector('button[onclick="sortUncompletedFirst"]');
    if (markAllButton) {
        markAllButton.setAttribute('aria-pressed', 'true');
    }
}