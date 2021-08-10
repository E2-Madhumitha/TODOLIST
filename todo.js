var selectoption=document.querySelector(".navlist");
var todolist=document.querySelector(".todolist");
var listcontainer=document.querySelector(".listcontainer");
var noitemsdisplay=document.querySelector(".noitemsfound");
var modal=document.getElementById("addnewitem");
document.querySelector("#add").addEventListener("click",add);  
var todotask=document.querySelector("#todotask");
var todos;
if(localStorage.getItem('todos')===null)
{
    todos=[];
    console.log("ti");
}
else{
    todos=JSON.parse(localStorage.getItem('todos'));
}

function add(){
    modal.style.display='flex';
    var heading=modal.querySelector("h1");
    heading.innerHTML=" Add Task";
    heading.className="fas fa-plus";
    var button=modal.querySelectorAll("button");
    button[1].onclick=function(){
       todotask.value="";
       modal.style.display="none"
    }
    button[0].innerHTML="Submit"
    button[0].onclick=additems; 
}

function additems(){
   
    if (todotask.value =='') {
       var message=modal.querySelector("p");
       message.innerText="Type something to add task";
       setTimeout(function(){message.innerHTML="&nbsp;"},1500);
     } 
     else {
        savetodo(todotask.value);
        modal.style.display="none";
        var alert=document.getElementById("alert");
    alert.style.display='block';
    var message=alert.querySelector("p");
    message.innerHTML=`Added  "${todotask.value}" successfully!`;
    setTimeout(function(){alert.style.display="none"},1500);
    }
    document.getElementById("todotask").value='';
};


function savetodo(todo){
    console.log(todo);
    taskdetails={name:todo,status:"uncomplete"};
    todos.push(taskdetails);
    localStorage.setItem('todos',JSON.stringify(todos));
    display(taskdetails);
}
    todos.forEach(display);
    function display(todo){
        var listItem = document.createElement("li");
        console.log(todo);
        var completedButton = document.createElement("button"); 
        completedButton.classList.add("checkbtn");
        completedButton.innerHTML= '<i class="fa fa-check"></i>';
        
        
        var task = document.createElement("p");
        task.classList.add("task");
        task.innerHTML=todo.name;
        
        var editButton = document.createElement("button");
        editButton.classList.add("editbtn");
        editButton.innerHTML='<i class="fa fa-edit"></i>';
        
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("deletebtn");
        deleteButton.innerHTML='<i class="fa fa-trash"></i>';
        
        listItem.appendChild(task);
        listItem.appendChild(completedButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todolist.appendChild(listItem);
        
        if(todo.status==="completed")
        {
            listItem.classList.add("completed");
            task.classList.add("completed");
        }
        }
var editTask=function(){
    console.log("Edit Task");
    var listItem = this.parentNode;
    var topul=listItem.parentNode;
    var task=listItem.querySelector("p");    

    for(var i=0;i<topul.children.length;i++){
        var des=topul.children[i].querySelector("p");
        if(des.innerHTML===task.innerHTML){ 
            var index=i; 
            break;
        }
      }
      console.log(index);
    console.log(todos);
     if(listItem.classList.contains("completed")){
    var modal=document.getElementById("alert");
    modal.style.display='block';
    var message=modal.querySelector("p");
    message.innerHTML=`"${task.innerHTML}" is completed...so you cannot edit!`;
    setTimeout(function(){modal.style.display="none"},1500);
    console.log(message[0]);
        }
        else{
            console.log("inside else")
    var modal=document.getElementById("addnewitem");
    modal.style.display='flex';
    var heading=modal.querySelector("h1");
    heading.innerHTML=" Edit Task";
    heading.className="fas fa-edit"
    var edit=modal.querySelector("input");
    edit.value=task.innerHTML;
    console.log(task.innerHTML);
    var action=modal.querySelectorAll("button");
    action[0].innerHTML="save"
    action[0].onclick=function(){
   

    task.innerHTML=edit.value;
     console.log(task.innerHTML);
     console.log("confirm")
      todos[index].name=task.innerHTML;
      localStorage.setItem("todos",JSON.stringify(todos));
      task.classList.remove("editask"); 
      edit.value="";
      modal.style.display='none';  
       
     
      var alert=document.getElementById("alert");
      alert.style.display='block';
      var message=alert.querySelector("p");
      message.innerHTML=`Task edited successfully!`;
      setTimeout(function(){alert.style.display="none"},1300);

    }
    action[1].onclick=function(){
        edit.value="";
        modal.style.display="none"
    }
    } 
};
   
var taskCompleted = function() {
   var listItem = this.parentNode;
   var task=listItem.querySelector("p");
    todos=JSON.parse(localStorage.getItem('todos'));
   console.log(todos);
   var  index = todos.findIndex(todo => todo.name ===task.innerHTML);
   if(listItem.classList.contains("completed")){
    todos[index].status="uncompleted";
    listItem.classList.remove("completed");
    task.classList.remove("completed");

    var alert=document.getElementById("alert");
    alert.style.display='block';
    var message=alert.querySelector("p");
    message.innerHTML=`"${task.innerHTML}" is marked as incomplete<b>`;
    setTimeout(function(){alert.style.display="none"},1500);
    }
    else{
    listItem.classList.add("completed");
    task.classList.add("completed");
    todos[index].status="completed";
   
    }   
localStorage.setItem("todos",JSON.stringify(todos));  
};

 var deleteTask = function() {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var taskname=listItem.querySelector("p");
    var alltasks= listItem.parentNode;
    for(var i=0;i<alltasks.children.length;i++){
        var todo=alltasks.children[i].querySelector("p");
        if(todo.innerHTML==taskname.innerHTML)
        {
            var index=i;
        }
    }
   var popup=document.getElementById("deletemodal");
   popup.style.display='flex';
   var action=popup.querySelectorAll("button");
   var tasktodo=popup.querySelectorAll("p");
   tasktodo[0].innerHTML="Task - "+taskname.innerHTML;
   action[0].onclick=function() {

    console.log(todos);
   todos.splice(index,1);
   localStorage.setItem("todos",JSON.stringify(todos));
   listItem.remove();
   popup.style.display='none';
   }
  if(listItem.classList.contains("completed")){
    tasktodo[1].innerHTML="Status - Completed";
    tasktodo[1].style.color="green";}
  else{
    tasktodo[1].innerHTML="Status - InComplete"; 
    tasktodo[1].style.color="red";}
};

selectoption.addEventListener("click",function(e){
    console.log(e.target);
    e.preventDefault();
    var current = selectoption.getElementsByClassName("active");
    if(e.target.classList.contains("listitem")){
        var target=e.target;
    }
    else{
        var target=e.target.parentNode;
    }
    console.log(target);
    current[0].className = current[0].className.replace(" active", "");
    target.className += " active";
    var lists=todolist.querySelectorAll("li");
    listcontainer.style.display="block";
    noitemsdisplay.style.display="none";
    var count=0;
    switch(e.target.id){
        case "completed":
            for(var i=0;i<lists.length;i++){   
                if(lists[i].classList.contains("completed")){
                    lists[i].style.display="block";
                    console.log(lists[i]);
                    count+=1;
                }
                else{
                    lists[i].style.display="none"; 
                }  
            }
            break;
        case "added": 
        for(var i=0;i<lists.length;i++)
            {
                lists[i].style.display="block";
                count+=1;
            }
            break;
        case "to do":
        for(var i=0;i<lists.length;i++){ 
            
                if(lists[i].classList.contains("completed")){
                    lists[i].style.display="none";
                }
                else{
                    lists[i].style.display="block";  
                    count+=1;
                }
            }  
            break;  
}
console.log(count);
if(count==0){
    noitem(e.target.id);
}
})

function noitem(e){
    console.log("noitem");
    listcontainer.style.display="none";
    noitemsdisplay.style.display="flex";
    noitemsdisplay.innerHTML="No tasks "+e;
}

for(i=0;i<todolist.children.length;i++)
 {
    var todo=todolist.children[i];
    var deletetodo=todo.querySelector(".deletebtn");
    deletetodo.onclick=deleteTask;
    var edittodo=todo.querySelector(".editbtn");
    edittodo.onclick=editTask;
    var checktodo=todo.querySelector(".checkbtn");
    checktodo.onclick=taskCompleted;
}
