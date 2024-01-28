///import { Template } from "webpack";

import { formatDistanceToNowStrict,format } from "date-fns";
//factory function to create task using user input 
     export function CreateTask(name,date,detail,priority,complete){
                  return{
                        name:name,
                        detail:detail,
                        get userDeatail(){
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
            div.dataset.card = `${list.id}`
           let card = `
                  
                        <div class="head">
                              <h3>${list.name}</h3>
                              <h5 data-completed-task='${list.id}'>${list.count}</h5>
                        </div>
                        <div class="form-task">
                              <form data-add-task>
                                    <input type="text" id='${list.id}' data-task-name>
                                    <div>
                                          <button class="add-task" data-parent-card='${list.id}'>Add</button>
                                          <button class='cancel-task'>cancel</button>
                                    </div>
                              </form>
                        </div>
                        <div data-task-store='${list.id}'></div>
                  
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
            <div class='task-holder' data-task-holder='${taskArray.indexOf(task)}'>
                
            
            <div>
                  <input type="checkbox" name="${task.name}" ${task.status} data-task-checkbox class="task-checkbok" data-checkbox='${taskArray.indexOf(task)}'>   
                  <input type="text" name="${task.name}" style='background:${task.taskFlag};' data-user-task-name data-new-name='${taskArray.indexOf(task)}'  value='${task.name}'>  
                  <button data-show-detail='${taskArray.indexOf(task)}'><i class="fa-solid fa-pen-to-square edit-task"></i></button>
                  <button data-task-delete data-delete-task='${taskArray.indexOf(task)}' class=delete-task><i class="fa-solid fa-trash" data-delete-icon></i></button>
             </div>

            <div class="task-detail-holder" data-about-task='${taskArray.indexOf(task)}'> 
                
                 <span>
                    <input type="date" name="crossfit"  data-task-date data-date-input='${taskArray.indexOf(task)}'>
                    <select  name ='priority' class='task-priority-form'  data-priority ='${taskArray.indexOf(task)}' >
                        <option> set priority </option>
                        <option value="high">Priority 1</option>
                        <option value="medium">Priority 2</option>
                        <option value="low">Priority 3</option>
                   </select>
                   <p class="due-date" data-due-date ='${taskArray.indexOf(task)}'>${task.realDate}</p>
                </span>
                <div>
                    <textarea name="crossfit" placeholder="detail" class='task-description' data-detail='${taskArray.indexOf(task)}' >${task.userDeatail}</textarea>
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

     
      


     
    
     
    