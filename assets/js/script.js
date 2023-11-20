function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(taskItem) {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            var li = document.createElement('li');
            var deleteBtn = document.createElement('button');
            
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-task';
            deleteBtn.onclick = function() {
                li.remove();
                saveTasks(); // Update storage after deletion
            };

            li.textContent = task.text;
            li.appendChild(deleteBtn);
            if (task.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', function(e) {
                if (e.target !== deleteBtn) {
                    li.classList.toggle('completed');
                    saveTasks(); // Update storage after toggling completion
                }
            });

            document.getElementById('task-list').appendChild(li);
        });
    }
}

// Call loadTasks to populate the list on page load
loadTasks();

document.getElementById('add-task').addEventListener('click', function() {
    var taskValue = document.getElementById('new-task').value.trim();
    var dueDate= document.getElementById('task-date').value;

    if (taskValue) {
        var li = document.createElement('li');
        li.textContent= taskValue + ' -Due: ' + (dueDate ? dueDate: 'No deadline');
        var deleteBtn = document.createElement('button');
        
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-task';
        deleteBtn.onclick = function() {
            li.remove();
        };

        li.textContent = taskValue;
        li.appendChild(deleteBtn);

        li.addEventListener('click', function(e) {
            // Prevent the list item from being marked as complete when the delete button is clicked
            if (e.target !== deleteBtn) {
                li.classList.toggle('completed');
            }
        });

        document.getElementById('task-list').appendChild(li);
        document.getElementById('new-task').value = '';
        document.getElementById('task-date').value = ''; // Reset the date input
    }
    saveTasks();
});

//new features to be added
//task priority,editing tasks, due dates, task sorting, subtasks
//come up with pseudocode
//