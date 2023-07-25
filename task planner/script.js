var parent_task = document.getElementById("parent_task");
var start_date = document.getElementById("start_date");
var end_date = document.getElementById("end_date");
var status_check = document.getElementById("status_check");
var add_task = document.getElementById("add_task");
var subtask_name =document.getElementById("subtask_name")
var task_data=[];
var form_edit_box = document.getElementById("form_edit_box");


function close_editdetails(){
    form_edit_box.style.display ="none";
}

function add_data(){
    event.preventDefault();
    task = {};
    sub={};

    let t = false;
    let v=0;
    for(let i=0;i<task_data.length;i++){
        if(task_data[i].taskName==parent_task.value){
            t=true;
            break;
        }
        v++;
    }
    
    if(!t){
        task.taskName = parent_task.value;

        sub.startDate = start_date.value;
        sub.endDate = end_date.value;


        sub.statusCheck = status_check.value;

        task[subtask_name.value]=sub;

        task_data.push(task);
    
    }else{
        sub.startDate = start_date.value;
        sub.endDate = end_date.value;


        sub.statusCheck = status_check.value;

        task_data[v][subtask_name.value]=sub;
    }
    console.log(task_data);
    show_data();


}

function show_data(){
    let table_datas = document.getElementById("table_datas").innerHTML = "";
    table_datas.innerHTML = ""

    task_data.forEach((data , index)=>{
        document.getElementById("table_datas").innerHTML +=
        `
        <tr>
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
    <td><button onclick = "del_parent(${index})" id="Delete Parent">Delete</button></td>
</tr>
                `;

                subtable(index,data);
        
        // document.getElementById("table_datas").innerHTML +=`
        
        // `;

                
            //     <td>${data.subtaskName}</td>
            //     <td>${data.startDate} </td>
            //     <td>${data.endDate}</td>
            //     <td>${data.statusCheck}</td>
            //     <td>
            //         <button onclick = "edit_data(${index})" id="sub_edit">Edit</button>
            //         <button id="sub_delete">Delete</button>
            //     </td>
            // </tr>
     
//         </table>
//     </td>
//     <td><button onclick = "del_parent(${index})" id="Delete Parent">Delete</button></td>
// </tr>
    
//     `
    })
}
var k;
function subtable(id,data) {
    let str="";


        for(k in data){
            if(k=="taskName"){
                continue;
            }

           
            
            str +=`<tr>
            <td>${k}</td>
            
            <td>${data[k].startDate} </td>
            <td>${data[k].endDate}</td>
            <td>${data[k].statusCheck}</td>
            <td>
                <button onclick = "edit_data()" id="sub_edit">Edit</button>
                <button id="sub_delete">Delete</button>
            </td>
        </tr>
            `;
            console.log(k);
        }
        let v = "sub_task"+id;
        document.getElementById(v).insertAdjacentHTML("beforeend",str);

}
//edit the data

var edit_task = document.getElementById("edit_task")
var edit_subtask = document.getElementById("edit_subtask")
var edit_start_date = document.getElementById("edit_start_date")
var edit_end_date = document.getElementById("edit_end_date")
var edit_status = document.getElementById("edit_status")
var edit_btn = document.getElementById("edit_btn")

// ... (your existing code) ...

function edit_data(index, subtaskName) {
    form_edit_box.style.display = "block";
    document.getElementById("idx").value = index;
    document.getElementById("edit_subtask").value = subtaskName;
    document.getElementById("edit_start_date").value = task_data[index][subtaskName].startDate;
    document.getElementById("edit_end_date").value = task_data[index][subtaskName].endDate;
    document.getElementById("edit_status").value = task_data[index][subtaskName].statusCheck;
  }
  
  function update_data() {
    let idx = document.getElementById("idx").value;
    let subtaskName = document.getElementById("edit_subtask").value;
  
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
  
  // ... (your existing code) ...
  
  
function del_parent(index){
    task_data.splice(index, 1);
    show_data();

}






let search_input = document.getElementById("search_input");
search_input.oninput = function(){
    search_function();
}
function search_function(){
    let table_data = document.getElementById("table_datas");
    let tr = table_data.querySelectorAll("tr");

    
    let myvalue = search_input.value.toLowerCase();
    console.log(tr,table_data);
    let i;
    for(i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName("td")[0].innerHTML;
        // var name = tr[i].getElementsByTagName("td")[1].innerHTML;
        // alert(td.innerHTML);

        if(td.toLowerCase().indexOf(myvalue)>-1){
            tr[i].style.display = "";
        }
        // else if(name.toLowerCase().indexOf(myvalue)>-1){
        //     tr[i].style.display = "";
        // }
        else{
            tr[i].style.display = "none";
        }
    }
}