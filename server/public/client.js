console.log('JavaScript')

$(document).ready(onReady);

function onReady() {
    console.log('JQuery')

    $('#addTaskButton').on('click', addTask)

    $(document).on('click', '.completeButton', completeTask)
    $(document).on('click', '.deleteButton', deleteTask)
}

function addTask () {
    console.log('task was added')
}

function completeTask() {
    console.log('task was completed')
}

function deleteTask() {
    console.log('task was deleted')
}

