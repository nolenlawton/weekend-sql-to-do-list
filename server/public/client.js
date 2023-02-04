console.log('JavaScript')

$(document).ready(onReady);

function onReady() {
    console.log('JQuery')

    $('#addTaskButton').on('click', addTask)

    $(document).on('click', '.completeButton', completeTask)
    $(document).on('click', '.deleteButton', deleteTask)

    getTasks()
}

// GET request!
function getTasks() {
    console.log('get tasks')

    $("#taskSection").empty();

    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log("GET /task response", response);
        for (let taskObject of response) {
            if (taskObject.isCompleted === true) {
                $('#taskSection').append(`
                <tr data-id='${taskObject.id}' class='completed'>
                    <td>
                        ${taskObject.task}
                        (completed)
                    </td>
                    <td>
                        <button class="deleteButton">delete</button>
                    </td>
                </tr> 
            `);
            }
            else {
                $('#taskSection').append(`
                <tr data-id='${taskObject.id}'>
                    <td>
                        ${taskObject.task}
                    </td>
                    <td>
                        <button class="completeButton">complete</button>
                        <button class="deleteButton">delete</button>
                    </td>
                </tr>           
            `);
            };
        };
    }).catch((err) => {
        console.error('GET failed', err);
    });


};

// POST request!
function addTask () {
    console.log('task was added:');

    let taskObject = {
        task: $('#taskInput').val(),
        isCompleted: false
    };

    $.ajax({
        type: 'POST',
        url: '/task',
        data: taskObject
    }).then( function (response) {
        $('#taskInput').val(''),
        getTasks();
    }).catch((err) => {
        console.error('POST failed', err);
    })
};

// DELETE request!
function deleteTask() {
    console.log('task was deleted')
    let id = $(this).parents('tr').data('id');

    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`   
    }).then(() => {
        getTasks();
    }).catch((err) => {
        console.error('DELETE failed', err);
    })
}

// PUT request!
function completeTask(event) {
    event.preventDefault();

    console.log('task was completed')
    let id = $(this).parents('tr').data('id');

    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
        data: {
            isCompleted: true
        }
    }).then(() => {
        getTasks()
        // if($(this))

    }).catch((err) => {
        console.error('PUT failed', err);
    })
}