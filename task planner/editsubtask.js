

function add_data() {
  event.preventDefault();
  // ... (your existing code) ...
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
        <td><input type="text" value="${subtaskName}" onchange="edit_subtask(${id}, '${subtaskName}', this.value)"></td>
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
  document.getElementById("edit_subtask").value = subtaskName;
  document.getElementById("edit_start_date").value = task_data[index][subtaskName].startDate;
  document.getElementById("edit_end_date").value = task_data[index][subtaskName].endDate;
  document.getElementById("edit_status").value = task_data[index][subtaskName].statusCheck;
}

function edit_subtask(index, oldSubtaskName, newSubtaskName) {
  if (newSubtaskName.trim() === "") {
    alert("Subtask name cannot be empty.");
    return;
  }

  if (task_data[index][newSubtaskName]) {
    alert("Subtask name already exists.");
    return;
  }

  task_data[index][newSubtaskName] = task_data[index][oldSubtaskName];
  delete task_data[index][oldSubtaskName];
  show_data();
}

function update_data() {
  // ... (your existing code) ...
}

function del_parent(index) {
  // ... (your existing code) ...
}

function del_subtask(index, subtaskName) {
  // ... (your existing code) ...
}

let search_input = document.getElementById("search_input");
search_input.oninput = function () {
  search_function();
};

function search_function() {
  // ... (your existing code) ...
}



