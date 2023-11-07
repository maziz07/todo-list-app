console.log('script.js is linked correctly');
document.getElementById('add-task').addEventListener('click', function() {
    var taskValue = document.getElementById('new-task').value.trim();

    if (taskValue) {
        var li = document.createElement('li');
        li.textContent = taskValue;
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
        });
        document.getElementById('task-list').appendChild(li);
        document.getElementById('new-task').value = '';
    }
});
