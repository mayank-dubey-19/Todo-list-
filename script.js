let input = document.querySelector(".input");
let add = document.querySelector(".add");
let all = 0;
let remain = 0;
let complete = 0 ;

function addelement(tasktext , taskIndex){

    let ol = document.querySelector(".tasklist");
    let li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox")
    checkbox.className = "check";
    checkbox.addEventListener("change",function(){
        if(checkbox.checked){
           complete++;
           document.querySelector(".complete").innerHTML = "Complete :"+ complete;
           remain--;
           document.querySelector(".remaining").innerHTML = "Remaining : "+remain;
        }
        else{
          complete--;
           document.querySelector(".complete").innerHTML = "Complete : "+complete;
           remain++;
           document.querySelector(".remaining").innerHTML = "Remaining : "+remain;
        }
    });

    const span = document.createElement("span");
    span.innerText = tasktext ;
    input.value = " "; 

    const div = document.createElement("div");
    div.innerText = "🗑️"
    div.setAttribute("place-item" , "center" );
    div.className = "delete";
    div.addEventListener("click",function(){
        li.remove();
        task.splice(taskIndex, 1);
        localStorage.setItem("task", JSON.stringify(task));
        all--;
       if(complete>0 && checkbox.checked==true){
            complete--;
        }
        document.querySelector(".complete").innerHTML = "Complete : "+complete;
        if(remain>0 && checkbox.checked==false){
            remain--;
        }
        document.querySelector(".total").innerHTML = "Total : "+all;
        document.querySelector(".remaining").innerHTML = "Remaining : "+remain;
         if(all>0){
        document.querySelector(".para").innerHTML = " ";
        }
       else{
         document.querySelector(".para").innerHTML = "No task available"
        }
    
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(div);

    ol.appendChild(li); 
}

let task = JSON.parse(localStorage.getItem("task")) || [];

task.forEach((element , index ) => {
    
    all++;
    remain++;
    document.querySelector(".total").innerHTML = "Total : "+all;
    document.querySelector(".remaining").innerHTML = "Remaining : "+remain;

    document.querySelector(".para").innerHTML = " "; 
    
    addelement(element,index);
    

});

function addtask(){

    let tasklist = input.value.trim();
    if(tasklist === ""){
        return
    }
    task.push(tasklist);
    localStorage.setItem("task",JSON.stringify(task));

    all++;
    remain++;
    document.querySelector(".total").innerHTML = "Total : "+all;
    document.querySelector(".remaining").innerHTML = "Remaining : "+remain;

    document.querySelector(".para").innerHTML = " "; 
    addelement(tasklist, task.length -1);

    input.value = " ";
}
add.addEventListener("click" , function(){
    addtask();
});
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addtask();
    }
});
