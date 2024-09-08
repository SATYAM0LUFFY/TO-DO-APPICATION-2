
/* <div class="task-div counter">
    <div class="work">
        work1
    </div>                                                        
    <div class="delete-button">
        <button class="button-2 del" >DEL</button>
    </div>
</div> */




let todos=[];

async function loadTodo(){
    const response = await axios.get("http://localhost:3000");
    const dat = response.data;
    todos= dat;
    render();
}

async function AddTodos(newTask){
    await axios.post("http://localhost:3000",{                      // whwn you use await it waits  for a response to frthur contunue so it must receve some data 
       work: newTask
})
}

async function DeleteTodos(counter) {
    await axios.put("http://localhost:3000",{
        index: counter
    })
}

loadTodo();

function AddTodo(){
    let newTask = document.querySelector("input").value;
    todos.push(newTask);
    document.querySelector("input").value = "";
    AddTodos(newTask);
    render();
}
function DeleteTodo(counter){
    DeleteTodos(counter);
    todos.splice(counter,1);
    render();
}
function render(){
    let   tasksDiv = document.querySelector(".tasks-div") ;
    tasksDiv.innerHTML ="";
    let counter = 0;

    for(let i=0;i<todos.length;i++){

        const WorkDiv = document.createElement("div");
        WorkDiv.setAttribute("class", "work");
        WorkDiv.innerHTML= todos[i];


        const DeleteButDiv = document.createElement("div");
        DeleteButDiv.setAttribute("class", "delete-button");

        const DeleteBut = document.createElement("button");
        DeleteBut.setAttribute("class", "button-2 del");
        DeleteBut.setAttribute("onclick", "DeleteTodo("+counter+")");
        DeleteBut.innerHTML= "DEL";

        DeleteButDiv.appendChild(DeleteBut);

        const TaskDiv = document.createElement("div");
        TaskDiv.setAttribute("class", "task-div "+counter)

        TaskDiv.appendChild(WorkDiv);
        TaskDiv.appendChild(DeleteButDiv);

        tasksDiv.appendChild(TaskDiv);

        counter++;
    }
}