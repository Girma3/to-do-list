import {format } from "date-fns";
//factory function to create task using user input 
     export function CreateTask(name,date,detail,priority,complete){
                        return{
                                name:name,
                                detail:detail,
                                date:date,
                                priority:priority,
                                complete:complete,
                                id:Date.now().toString()
                        }
            }
//object to create list name and has array to store related task inside it
    export function CreateList(name,completed){
                        return{
                            name:name,
                            id:Date.now().toString(),
                            completed:completed,
                            tasks:[]
                            }
                }
//function that creat card html for list use object as parameter
    export function cardTemplate(list){
               let div = document.createElement('div');
                        div.dataset.card = `${list.id}`;
                        div.setAttribute('class','card');
                        //completed by default is undefined  to fix that
                        if(list.completed == undefined || list.completed == 0){
                            list.completed = `completed Tasks counted here.`;
                        }
                        else if(list.completed == 1){
                            list.completed = `${list.completed} Task completed 🎯`;
                        }
                        else if(list.completed > 1){
                             list.completed = `${list.completed} Tasks completed 🚀`;
                        }
                        
                    let card = `
                  
                        <div class="head">
                           <div class="project-holder">
                           <input type="text" data-project-name='${list.id}' name='${list.name}' class="project-name" value='${list.name}'>
                             
                              <div class="project-btn-holder">
                              <button data-edit-name ='${list.id}' ><i class="fa-solid fa-pen-to-square" data-edit-project></i></button>
                              <button data-delete-card='${list.id}'><i class="fa-solid fa-trash" data-delete-project></i></button>
                              
                              </div>
                           </div>

                        </div>
                           <h5 data-completed-task='${list.id}'>${list.completed}</h5>
                        </div>

                        <div class="form-task">
                              <form data-add-task>
                                    <input type="text" id='${list.id}' data-task-name placeholder = '+ Add Task'>
                                    <div>
                                          <button class="add-task" data-parent-card='${list.id}'>Add</button>
                                          <button class='cancel-task'>cancel</button>
                                    </div>
                              </form>
                        </div>
                        <div class="task-store" data-task-store='${list.id}'></div>
                  
                  `
                 div.innerHTML = card
            return div
        }
      //function to inject literal html to parent item to display
   export   function displayList(arr,dom){
                dom.textContent = '';
                arr.forEach(list=>{
                    let li = document.createElement('li');
                        li.textContent = list.name;
                        li.dataset.list = list.id;
                        dom.appendChild(li)
                    });
             }  
//function that creat task html use array of objects as parameter
  export  function taskTemplate(taskArray){
     
                let divs = document.createElement('div');
                    taskArray.forEach(task=> {
                        //detail about task empty at first
                            if(task.date == NaN || task.date == undefined){
                                task.date =  format(Date.now(),"EE io LLL yyyy")
                                }
                            if(task.detail == undefined){
                                task.detail = ''
                            }
        let div = document.createElement('div');
     
     
          let taskhtml = `
            <div class='task-holder' id="${task.id}" data-task-holder='${task.id}'>
                <div class="task-head">
                  <div class="task-head-input">
                        <input type="checkbox" name="${task.name}" ${task.complete} data-task-checkbox class="task-checkbox" data-checkbox='${task.id}'>   
                        <input type="text" name="${task.name}" style='background:${task.priority};' data-user-task-name data-new-name='${task.id}' value="${task.name}">  
                  </div>
                  <div class="task-btn-holder">
                        <button data-show-detail='${task.id}' class="task-edit-btn"><i class="fa-solid fa-pen-to-square edit-task"></i></button>
                        <button data-task-delete data-delete-task='${task.id}' class = "delete-task-btn"><i class="fa-solid fa-trash" data-delete-icon></i></button>
                  </div>
                </div>      
                <div class="task-detail-holder" data-about-task='${task.id}'> 
                 <span>
                    <input type="date" name="crossfit"  data-task-date data-date-input='${task.id}' placeholder='m'>
                    <select  name ='priority' class='task-priority-form'  data-priority ='${task.id}' >
                        <option >Set Priority</option>
                        <option value="red">high (red)</option>
                        <option value="yellow">medium (yellow)</option>
                        <option value="pink">Low (pink)</option>
                   </select>
                   <p class="due-date" data-due-date ='${task.id}'>${task.date}</p>
                 </span>
                    <div>
                      <textarea name="crossfit" placeholder="detail" class='task-description' data-detail='${task.id}'>${task.detail}</textarea>
                    </div>
                </div>
            </div>
           `
            div.innerHTML = taskhtml
            divs.appendChild(div)
      });
           return divs
      }
      
     
     //function that accept obj and dom element to append it creats html element and attach it to dom given 
    export function displayCard(obj,dom){
                dom.textContent = ''
                dom.appendChild(cardTemplate(obj))
                return dom
       }
      
       /*
         *function to find object that hold specific task inside it's array we can use the task id to find 
        * parent object
        *parameter 1: array of objects
        *parameter 2: id number
        *parameter inside: object property(tasks and id) is used if change made remmember to change it
        *return object
        *
        *  
        */
       export   function findObj(arr,id){
           let targetObject;
            arr.forEach(obj =>{
               obj.tasks.forEach(task=>{
                    if(task.id == id){
                        targetObject = obj;
                    }
                });
            });
            return targetObject
        }
        /*
        *function to find task using id
        *parameter 1:obj
        *parameter 2:id
        * object tasks and id property used
        */
        export function findTask(obj,id){
            let targetTask;
                obj.tasks.forEach(task=>{
                   if((task.id == id) == true){
                     targetTask = task;
                   }
                 });
         
             return targetTask
         }
         //function that accept nodelist find that element and display it and close others
        export function hideOthers(arr,domElement){
                arr.forEach(element => {
                    element == domElement ? element.style.display = 'block' :element.style.display = 'none'
                 });
          }
          //function to find object using id from array
       export   function findObject(arr,id){
            let targetObject;
                arr.forEach(obj =>{
                    if(obj.id == id){
                        targetObject = obj;
                    }
                });
             return targetObject
         }
         //default object to show
    export     function defaultArray (){
          let  todo =  
            
                {
                    "name": "Make To Do List",
                    "id": "1706788379794",
                    "completed": 0,
                    "tasks": [
                        {
                            "name": "Make Objects.",
                            "detail": "",
                            "date": "Thu 4th Feb 2024",
                            "complete": "0",
                            "id": "1706788387842"
                        },
                        {
                            "name": "list it's behaviours.",
                            "detail": "",
                            "date": "Thu 4th Feb 2024",
                            "id": "1706788397200",
                            "priority": "yellow"
                        },
                        {
                            "name": "Separate logic and Dom.",
                            "detail": "",
                            "date": "Thu 4th Feb 2024",
                            "id": "1706788420685"
                        }
                    ]
                }
            
            ;
            return todo
         }

     
      


     
    
     
    