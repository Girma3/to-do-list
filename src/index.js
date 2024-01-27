///import { Template } from "webpack";

//factory function to create task using user input 
     export function CreateTask(name,detail,priority){
                  return{
                        name:name,
                        detail:detail,
                        date:function getDate(a,b){
                              return a - b
                        },
                        priority:priority,
                        complete:false,
                        id:Date.now().toString()
                   }
            }
//object to create list name and has array to store related task inside it
      export function CreateList(name){
            return{
                  name:name,
                  id:Date.now().toString(),
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
                              <h5>1 task completed</h5>
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
                  <input type="checkbox" data-task-checkbox  class="task-checkbox">   
                  <input type="text" name="${task.name}" data-task-name value='${task.name}' >
                  <button data-show-detail='${taskArray.indexOf(task)}' class="edit-task"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button data-task-delete class=delete-task><i class="fa-solid fa-trash"></i></button>
             </div>

            <div class="task-detail-holder" data-about-task='${taskArray.indexOf(task)}'> 
                
                 <span>
                    <input type="date" name="crossfit"  data-task-date data-date-input='${taskArray.indexOf(task)}'>
                    <select name="prority" data-priority ='${taskArray.indexOf(task)}' >
                        <option >Priority</option>
                        <option value="high">Priority 1</option>
                        <option value="medium">Priority 2</option>
                        <option value="low">Priority 3</option>
                   </select>
                   <p class="due-date" data-due-date = '${taskArray.indexOf(task)}'>2 weeks ago</p>
                </span>
                <div>
                    <textarea name="crossfit" placeholder="detail" data-detail='${taskArray.indexOf(task)}' ></textarea>
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

      //  export function displayTask(tasksarr,dom){
      //        let divs = document.createElement('div') 
      //     taskTemplate(tasksarr).forEach(ele=>{
      //       let div = document.createElement('div')
      //       div.appendChild(ele)
      //       divs.appendChild(div)
      //     })
      //     return divs
          
      //     }


     
    
     
    