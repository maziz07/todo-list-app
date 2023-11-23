function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(taskItem) {
        // Assuming the due date is part of the text content in the format "Task - Due: date"
        var taskParts = taskItem.textContent.split(' - Due: ');
        var taskText = taskParts[0];
        var dueDate = taskParts[1] || 'No deadline';

        tasks.push({
            text: taskText,
            dueDate: dueDate,
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

            // Combine the task text and due date
            li.textContent = task.text + ' - Due: ' + task.dueDate;
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
    var dueDate = document.getElementById('task-date').value;
    console.log("Task: " + taskValue); // Debugging
    console.log("Due Date: " + dueDate); // Debuggin

    if (taskValue) {
        var li = document.createElement('li');

        // Create a text node for the task and due date
        var textNode = document.createTextNode(taskValue + ' - Due: ' + (dueDate ? dueDate : 'No deadline'));
        li.appendChild(textNode);

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-task';
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks(); // Update storage after deletion
        };

        li.appendChild(deleteBtn);

        li.addEventListener('click', function(e) {
            if (e.target !== deleteBtn) {
                li.classList.toggle('completed');
                saveTasks(); // Update storage after toggling completion
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
//new features come up qith ideas