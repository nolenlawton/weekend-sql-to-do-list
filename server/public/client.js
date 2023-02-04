console.log('JavaScript')

$(document).ready(onReady);

function onReady() {
    console.log('JQuery')

    $('#addTaskButton').on('click', addTask)
    $('#addTaskButton').on('mouseover', onHoverAdd)
    $('#addTaskButton').on('mouseout', offHoverAdd)


    $(document).on('click', '.completeButton', completeTask)
    $(document).on('mouseover', '.completeButton', onHoverAdd)
    $(document).on('mouseout', '.completeButton', offHoverAdd)

    $(document).on('click', '.deleteButton', deleteTask)
    $(document).on('mouseover', '.deleteButton', onHoverDelete)
    $(document).on('mouseout', '.deleteButton', offHoverDelete)

    getTasks()
}

function onHoverAdd() {
    $(this).addClass('onHoverAdd')
}
function offHoverAdd() {
    $(this).removeClass('onHoverAdd')
}

function onHoverDelete() {
    $(this).addClass('onHoverDelete')
}
function offHoverDelete() {
    $(this).removeClass('onHoverDelete')
}

// GET request!
function getTasks() {
    console.log('get tasks')

    $("#taskSection").empty();

    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        for (let taskObject of response) {
            if (taskObject.isCompleted === true) {
                $('#taskSection').append(`
                <tr data-id='${taskObject.id}' class='completed'>
                    <td>
                        ${taskObject.task}
                        (completed)
                    </td>
                    <td>
                        <button class='afterCompleteButton'>✓</button>
                        <button class="deleteButton button">-</button>
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
                        <button class="completeButton button">✓</button>
                        <button class="deleteButton button">-</button>
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

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover task!",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
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
      });
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