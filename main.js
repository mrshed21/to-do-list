const task = document.getElementById("input");
const addTask = document.getElementById("add-btn");
const outPut = document.getElementById("output-sec");
const deleteAll = document.getElementById("delete-all");

let arr = [];
if (localStorage.dataLocal != null) {
  arr = JSON.parse(localStorage.getItem("dataLocal"));
} else {
  arr = [];
}

let add_edit = "add";
let iValue;

addTask.onclick = function () {
  let taskObject = {
    containtTask: task.value,
  };
  if (add_edit === "add") {
    if (task.value != "") {
      arr.push(taskObject);
      task.placeholder = "Enter Your Task";
    } else {
      task.placeholder = "Please Enter Your Task";
    }
  } else if (add_edit === "edit") {
    if (task.value != "") {
      arr[iValue].containtTask = task.value;
      console.log(task.value);
      task.placeholder = "Enter Your Task";
      add_edit = "add";
    } else {
      task.placeholder = "Please Enter Your Task";
    }
    addTask.innerHTML = "Add Task";
  }

  localStorage.setItem("dataLocal", JSON.stringify(arr));

  showData();
};

function showData() {
  let dataTask = "";
  for (let i = 0; i < arr.length; i++) {
    dataTask += `
            <div class="task row border border-5 border-light bg-primary my-2 ">
                <h2 class="text-white  col-lg-7 col-md-5 mx-5 fs-3 fw-bold py-4" id="title">${arr[i].containtTask}</h2>
                <div class="col-lg-4 col-md-5 py-4 d-flex justify-content-around w-25">
                    <button onclick="editTask (${i})" class="btn btn-success me-3 fs-5 px-3" id="update">update</butto>
                    <button onclick="deleteTask (${i})" class="btn btn-danger fs-5 px-3" id="delete">delete</button>
                </div>
            </div>
        `;
  }

  if (arr == "") {
    deleteAll.innerHTML = "";
  } else {
    deleteAll.innerHTML = `
            <button onclick="deleteAllTasks ()" class="btn btn-danger w-50 fs-1 ">Delete All Tasks (${arr.length})</button>

    `;
  }

  task.value = "";
  outPut.innerHTML = dataTask;
}



function deleteTask(i) {
  arr.splice(i, 1);
  localStorage.dataLocal = JSON.stringify(arr);
  showData();
}

function editTask(i) {
  task.value = arr[i].containtTask;
  console.log(task.value);
  addTask.innerHTML = "Update Task";
  add_edit = "edit";
  iValue = i;
}

/* <div class="task">
<h2 id="title">${arr[i].containtTask}</h2>
<div>
    <button onclick="editTask (${i})" id="update">update</butto>
    <button onclick="deleteTask (${i})" id="delete">delete</button>
    </div>
    </div>
*/

function deleteAllTasks() {
  arr = [];
  localStorage.clear();
  showData();
}

showData();
