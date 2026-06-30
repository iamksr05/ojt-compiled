function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function loadTasks(){

    const storedTasks =
    localStorage.getItem("tasks");

    if(storedTasks){

        tasks =
        JSON.parse(storedTasks);

    }

}