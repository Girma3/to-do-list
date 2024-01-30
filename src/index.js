///import { Template } from "webpack";

import { formatDistanceToNowStrict,format } from "date-fns";
//factory function to create task using user input 
     export function CreateTask(name,date,detail,priority,complete){
                  return{
                        name:name,
                        detail:detail,
                        get userDetail(){
                              if(this.detail == undefined) return ''
                              let aboutTask = this.detail
                                  return aboutTask
                        },
                        date:date,
                        get realDate(){
                                 if(this.date == NaN || this.date == undefined){ return format(Date.now(),"EE io LLL yyyy")}
                              let result = formatDistanceToNowStrict(this.date,{addSuffix:true})
                              return result
                        },
                             
                              
                              
                              
                        
                        
                        priority:priority,
                        get taskFlag(){
                              let style;
                              if(this.priority == 'Priority' || this.priority == undefined) return "white"

                              else if(this.priority == 'high'){
                                   
                                     return style = 'red'
                              }
                              else if(this.priority == 'medium'){
                                    return style = 'yellow'
                              }
                              else if(this.priority == 'low'){
                                    return style = 'pink'
                              }
                        },
                        complete:complete,
                        get status(){
                            let taskStatus = this.complete == true ? 'checked' : ' ';
                            return taskStatus
                              
                        },
                       
                        id:Date.now().toString()
                   }
            }
//object to create list name and has array to store related task inside it
      export function CreateList(name,tasksFinished){
            return{
                  name:name,
                  id:Date.now().toString(),
                  tasksFinished:tasksFinished,
                  get count(){
                      if(this.tasksFinished == undefined) return `Finished task will be counted here ✅ `
                      else if(this.tasksFinished == 1) return `${this.tasksFinished} task Finished 🎯`
                        let tasksCompleted =  this.tasksFinished > 1 ? `${this.tasksFinished} tasks finished  🚀 ` : `No task completed yet 📋.`
                            return tasksCompleted
                   },
                  tasks:[]

            }
       }

      
      

  
    //function that creat card html for list use object as parameter

 export     function cardTemplate(list){
       let div = document.createElement('div');
            div.dataset.card = `${list.id}`;
            div.setAttribute('class','card')
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

                              
                              <h5 data-completed-task='${list.id}'>${list.count}</h5>
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
             //})
             return div
        }
      //function to inject literal html to parent item to display
   export   function displayList(arr,dom){
      dom.textContent = '';
      arr.forEach(list=>{
        let li = document.createElement('li');
            li.textContent = list.name 
            li.dataset.list = list.id
            dom.appendChild(li)
            
      })
      }  
    
      


                        

          
      //function that creat task html use array of objects as parameter
  export  function taskTemplate(taskArray){
     
           let divs = document.createElement('div');
            taskArray.forEach(task=> {
                  let div = document.createElement('div');
     
          let taskhtml = `
            <div class='task-holder' id="${task.id}" data-task-holder='${task.id}'>
                
            
            <div class="task-head">
                  <div class="task-head-input">
                        <input type="checkbox" name="${task.name}" ${task.status} data-task-checkbox class="task-checkbox" data-checkbox='${task.id}'>   
                        <input type="text" name="${task.name}" style='background:${task.taskFlag};' data-user-task-name data-new-name='${task.id}'  value='${task.name}'>  
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
                        <option> set priority </option>
                        <option value="high">Priority 1</option>
                        <option value="medium">Priority 2</option>
                        <option value="low">Priority 3</option>
                   </select>
                   <p class="due-date" data-due-date ='${task.id}'>${task.realDate}</p>
                </span>
                <div>
                    <textarea name="crossfit" placeholder="detail" class='task-description' data-detail='${task.id}' >${task.userDetail}</textarea>
                </div>
           </div>
           </div>
           `
            div.innerHTML = taskhtml
            divs.appendChild(div)
      });
           
        
        return divs
      }
      
     
     
      export function displayCard(lists,dom){
     
            dom.textContent = ''
                dom.appendChild(cardTemplate(lists))
                
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
                        targetObject = obj
                    }
                });
            });
            return targetObject
        }
        /*
        *function to find task using id
        *parameter 1:obj
        *parameter 2:id
        *parameter indide: obj tasks and id property used
        */
        export function findTask(obj,id){
            let targetTask;
                obj.tasks.forEach(task=>{
                   if((task.id == id) == true){
                     targetTask = task
                   }
                 });
         
             return targetTask
         }
         //function that accept nodelist find that element and display it and lose others
        export function hideOthers(arr,domElement){
            arr.forEach(element => {
                if(element == domElement){
                    element.style.display = 'block';
                }
                else{
                    element.style.display = 'none';
                }
            });
          }
          //function to find object using id from array
       export   function findObject(arr,id){
            let targetObject;
             arr.forEach(obj =>{
                
                if(obj.id == id){
                    targetObject = obj
                }
                   
                 });
             
             return targetObject
         }

     
      


     
    
     
    