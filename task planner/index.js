
// ... (your existing code) ...
var parent_task = document.getElementById("parent_task");
var start_date = document.getElementById("start_date");
var end_date = document.getElementById("end_date");
var status_check = document.getElementById("status_check");
var add_task = document.getElementById("add_task");
var subtask_name = document.getElementById("subtask_name")
var task_data = [];
var form_edit_box = document.getElementById("form_edit_box");

function close_editdetails() {
  form_edit_box.style.display = "none";
}


function add_data() {
  event.preventDefault();

  if (parent_task.value.trim() === '' ||
    start_date.value.trim() === '' ||
    end_date.value.trim() === '' ||
    status_check.value.trim() === '' ||
    subtask_name.value.trim() === '') {
    alert("Please fill in all the fields.");
    return; // Exit the function if validation fails
  }

  const startDate = new Date(start_date.value);
  const endDate = new Date(end_date.value);
  if (endDate <= startDate) {
    alert("End date should be greater than start date.");
    return; // Exit the function if validation fails
  }


  task = {};
  sub = {};

  let task_exists = false;
  let temp = 0;
  for (let i = 0; i < task_data.length; i++) {
    if (task_data[i].taskName == parent_task.value) {
      task_exists = true;
      break;
    }
    temp++;
  }

  if (!task_exists) {
    task.taskName = parent_task.value;

    sub.startDate = start_date.value;
    sub.endDate = end_date.value;


    sub.statusCheck = status_check.value;

    task[subtask_name.value] = sub;

    task_data.push(task);

  } else {
    sub.startDate = start_date.value;
    sub.endDate = end_date.value;


    sub.statusCheck = status_check.value;

    task_data[temp][subtask_name.value] = sub;
  }
  console.log(task_data);


  show_data();
}


function show_data() {
  let table_datas = document.getElementById("table_datas").innerHTML = "";
  table_datas.innerHTML = "";

  task_data.forEach((data, index) => {
    document.getElementById("table_datas").innerHTML +=
      `<tr>
          <td>${data.taskName}</td>
          <td>
            <table id="sub_task${index}">
              <tr>
                <th>Subtask</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </table>
          </td>
          <td><button onclick="del_parent(${index})" id="DeleteParent">Delete</button></td>
        </tr>`;
    subtable(index, data);
  });
}

function subtable(id, data) {
  let str = "";
  for (const subtaskName in data) {
    if (subtaskName !== "taskName") {
      str += `<tr>
          <td>${subtaskName}</td>
          <td>${data[subtaskName].startDate}</td>
          <td>${data[subtaskName].endDate}</td>
          <td>${data[subtaskName].statusCheck}</td>
          <td>
            <button onclick="edit_data(${id}, '${subtaskName}')" id="sub_edit">Edit</button>
            <button onclick="del_subtask(${id}, '${subtaskName}')" id="sub_delete">Delete</button>
          </td>
        </tr>`;
    }
  }
  let v = "sub_task" + id;
  document.getElementById(v).insertAdjacentHTML("beforeend", str);
}

function edit_data(index, subtaskName) {
  form_edit_box.style.display = "block";
  document.getElementById("idx").value = index;
  document.getElementById("edit_task").value = task_data[index].taskName;
  document.getElementById("edit_subtask").value = subtaskName;
  document.getElementById("edit_start_date").value = task_data[index][subtaskName].startDate;
  document.getElementById("edit_end_date").value = task_data[index][subtaskName].endDate;
  document.getElementById("edit_status").value = task_data[index][subtaskName].statusCheck;
}

function update_data() {
  let idx = document.getElementById("idx").value;
  let subtaskName = document.getElementById("edit_subtask").value;

  // task_data[idx][subtaskName]={};
  if (task_data[idx] && task_data[idx][subtaskName]) {
    
    task_data[idx][subtaskName].startDate = document.getElementById("edit_start_date").value;
    task_data[idx][subtaskName].endDate = document.getElementById("edit_end_date").value;
    task_data[idx][subtaskName].statusCheck = document.getElementById("edit_status").value;
    form_edit_box.style.display = "none";
    show_data();
  } else {
    alert("Error: Invalid index or subtask name.");
  }
}

// Function to handle changes in the start and end dates

function handleDateChange() {
  const startDateInput = document.getElementById('start_date');
  const endDateInput = document.getElementById('end_date');
  const status_check = document.getElementById('status_check');
  const startD = new Date(startDateInput.value);
  const endD = new Date(endDateInput.value);
  const today = new Date();

  
  // Disable dates before today in both start date and end date inputs
  startDateInput.setAttribute("min", today.toISOString().split("T")[0]);
  endDateInput.setAttribute("min", today.toISOString().split("T")[0]);

  // Get the selected status from the dropdown
  const selectedStatus = status_check.value.trim().toLowerCase();

  if (!selectedStatus) {
    // If no status is manually selected, update status based on dates
    if (startD > today) {
      status_check.value = "In Progress";
    } else if (endD < today) {
      status_check.value = "Due Passed";
    } else {
      status_check.value = "Completed";
    }
  }
}

function del_parent(index) {
  task_data.splice(index, 1);
  show_data();
}

function del_subtask(index, subtaskName) {
  delete task_data[index][subtaskName];
  show_data();
}



let search_input = document.getElementById("search_input");
search_input.addEventListener("input", function () {
  search_function();
});

function search_function() {
  let table_data = document.getElementById("table_datas");
  let tr = table_data.querySelectorAll("tr");

  let searchValue = search_input.value.toLowerCase();
  tr.forEach(row => {
    let td = row.querySelector("td");
    if (td) {
      let rowText = td.textContent.toLowerCase();
      if (rowText.includes(searchValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
}



