import './style.css'
import { CreateTask } from './index.js'
import { CreateList } from './index.js'

import { displayList } from './index.js'
import { displayCard } from './index.js'
import {taskTemplate} from './index.js'


//dom elements on task
let navList = document.querySelector('[data-lists]');
let main = document.querySelector('.task-cards')
let userList = document.querySelector('[data-name=user-list]')
let submitList = document.querySelector('.submit-list')
//task add

 let addTaskBtn = document.querySelector('.add-task');
 //list nav
 let listHolder = document.querySelector('[data-lists]')
let lists = []
let selectedObj;
submitList.addEventListener('click',(e)=>{
    e.preventDefault();
    let userInput = userList.value;
    lists.push(CreateList(userInput))
    let index = Number(lists.length) - Number(1)
    displayList(lists,navList)
    displayCard(lists[index],main)
   
    
})
main.addEventListener('click',(e)=>{
    
    if(e.target.matches('.add-task')){
        e.preventDefault();
        //on the card we had the same dataset id number as the add btn,and same with selected list object
        let id =Number(e.target.dataset.parentCard);
        let currentCard = document.querySelector(`[data-task-store='${id}']`);
        let taskName = document.querySelector('[data-task-name]');
        let selectedobj = lists.find(list=> list.id == id);
            selectedobj.tasks.push(CreateTask(taskName.value))
            currentCard.textContent = ''
            currentCard.appendChild(taskTemplate(selectedobj.tasks));
            taskName.value = ''
      }
    if(e.target.matches('[data-user-task-name]')){
        let index =Number(e.target.dataset.newName);
        //lists hold array of object we get current object by decreade  1 to it's length 
        let  objIndex = Number(lists.length) - Number(1)
        let selectedobj = lists[objIndex];

        //get clicked task input using it's dataset 
        let userTaskName = document.querySelector(`[data-new-name='${index}']`);
        
        //on change event update that task object name it has similar index to dataset
        userTaskName.addEventListener('change',e=>{
               if(userTaskName.value == '') return  userTaskName.value = "no name"
               let updateName = selectedobj.tasks[index].name = userTaskName.value
               userTaskName.textContent = selectedobj.tasks[index].name
         
        })
        
      }
      //when edit btn clicked on task display task detail
    if(e.target.matches('.edit-task')){
          let index = e.target.parentElement.dataset.showDetail
          let taskHolder = document.querySelector(`[data-about-task='${index}'`)
              taskHolder.style.display = 'block'
         }
         //get date value on change event
    if(e.target.matches('[data-task-date]')){
            let index = e.target.dataset.dateInput
            //get clicked date input
            let userDate = document.querySelector(`[data-date-input='${index}']`);
            //add eventListener to it and update task object value
                userDate.addEventListener('change',e=>{
                    let  objIndex = Number(lists.length)-Number(1)
                    let selectedobj = lists[objIndex]
                    //save
                    let updateDate = selectedobj.tasks[index].date = userDate.value
                    //summerize  the task due date
                    let dueDate = document.querySelector(`[data-due-date ='${index}']`);
                    //use object to update
                        dueDate.textContent = selectedobj.tasks[index].realDate
                        //save
                })
         }
         //event on priority form
    if(e.target.matches('.task-priority-form')){
            let index = e.target.dataset.priority
            let  objIndex = Number(lists.length)-Number(1)
            let selectedobj = lists[objIndex]
            let prioritySelect  = document.querySelector(`[data-priority='${index}']`);
            //task name
            let taskname =  document.querySelector(`[data-new-name='${index}']`);
            let updatePriority = selectedobj.tasks[index].priority = prioritySelect.value
            //refresh the style name
                 taskname.style.backgroundColor = selectedobj.tasks[index].taskFlag;
               
                 //save 
             }
             //event on detail input about the task
      if(e.target.matches('.task-description')){
                let index = e.target.dataset.detail;
                let  objIndex = Number(lists.length)-Number(1);
                let selectedobj = lists[objIndex]
                let userTaskDetail =  document.querySelector(`[data-detail='${index}']`);
                   //use on change event
                    userTaskDetail.addEventListener('change',e=>{
                //update the detail and save
                let updateDetail = selectedobj.tasks[index].detail = userTaskDetail.value
                userTaskDetail.textContent = selectedobj.tasks[index].userTaskDetail
              });
             }
      if(e.target.matches('[data-task-checkbox')){
                let index = Number(e.target.dataset.checkbox);
                let objIndex = Number(lists.length)-Number(1);
                let selectedobj = lists[objIndex];
                let userTaskStatus = document.querySelector(`[data-checkbox='${index}']`);
                //add event on checkbox and update if task is complete or not
                    userTaskStatus.addEventListener('change',(e) => {
                      //if checked is true the task is complete else false
                      let updateComplete = selectedobj.tasks[index].complete = userTaskStatus.checked
                    console.log(selectedobj.tasks[index].status);
                          
                      let alltask = selectedobj.tasks.filter(task=> task.complete == true)
                     // console.log()
                      //card task completed count has same id as object id
                      let projetTasks = document.querySelector(`[data-completed-task='${selectedobj.id}']`);
                          projetTasks.textContent = alltask.length
                    
                       });

                } 
      if(e.target.matches('[data-delete-icon')){
        let index = Number(e.target.parentElement.dataset.deleteTask);
        let objIndex = Number(lists.length)-Number(1);
        let selectedobj = lists[objIndex];
        //remove is's task hollder div and remove that task from the selected object permanently
        let userTaskDelete = document.querySelector(`[data-task-holder='${index}']`);
            selectedobj.tasks.splice(index,1)
            userTaskDelete.remove()
       
       
        

      }               
      
      
})
//when the list clicked get the id of that list find that object and display it with it's tasks 

listHolder.addEventListener('click',(e)=>{
      //get clicked list dataset it has same id with the object
      let id = Number(e.target.dataset.list)
      let selectedobj = lists.find(list=> list.id == id);
      displayCard(selectedobj,main)
      //append  tasks to related project useing id
      let currentCard = document.querySelector(`[data-task-store='${id}']`);
          currentCard.appendChild(taskTemplate(selectedobj.tasks))
    
});
