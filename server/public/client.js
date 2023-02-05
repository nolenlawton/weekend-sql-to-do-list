console.log('JavaScript')

$(document).ready(onReady);

function onReady() {
    console.log('JQuery')

    $('#addTaskButton').on('click', addTask)
    $('#addTaskButton').on('mouseover', onHoverAdd)
    $('#addTaskButton').on('mouseout', offHoverAdd)

    $(document).on('click', '#sortComplete', sortByCompletion)
    $(document).on('click', '#sortIncomplete', getTasks)


    $(document).on('click', '.completeButton', completeTask)
    $(document).on('mouseover', '.completeButton', onHoverAdd)
    $(document).on('mouseout', '.completeButton', offHoverAdd)

    $(document).on('click', '.deleteButton', deleteTask)
    $(document).on('mouseover', '.deleteButton', onHoverDelete)
    $(document).on('mouseout', '.deleteButton', offHoverDelete)

    getTasks()
}

// GET request!
function getTasks() {
    console.log('get tasks')

    $("#taskSection").empty();
    $('#sort').empty()

    $('#sort').append(`<p id="sortComplete">See Completed Tasks</p>`)

    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        for (let taskObject of response) {
            if (taskObject.isCompleted === false) {
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

function sortByCompletion() {
    $("#taskSection").empty();
    $('#sort').empty()

    $('#sort').append(`<p id="sortIncomplete">See Incompleted Tasks</p>`)
  
    $.ajax({
      type: 'GET',
      url: '/task/byCompletion'
    }).then(function(response) {
        for (let taskObject of response) {

            console.log(taskObject)
            if (taskObject.isCompleted === true) {

                $('#taskSection').append(`
                <tr data-id='${taskObject.id}' class='completed'>
                    <td>
                        ${taskObject.task}
                        (completed on ${taskObject.completedDate})
                    </td>
                    <td>
                        <button class='afterCompleteButton'>✓</button>
                        <button class="deleteButton button">-</button>
                    </td>
                </tr> 
            `);
            }
        };
    }).catch(function(error){
      console.log('error in GET', error);
    });
  
  }

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

    let completionDay = new Date().getDate();
    let completionMonth = new Date().getMonth() + 1;
    let completionDate = `${completionMonth}/${completionDay}`   


    console.log('task was completed')
    let id = $(this).parents('tr').data('id');

    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
        data: {
            isCompleted: true,
            completionDate: completionDate
        }
    }).then(() => {
        getTasks()
    }).catch((err) => {
        console.error('PUT failed', err);
    })
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