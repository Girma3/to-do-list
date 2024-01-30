import './style.css'
import { CreateTask } from './index.js'
import { CreateList } from './index.js'
import {taskTemplate} from './index.js'
import { displayList } from './index.js'
import { displayCard } from './index.js'
import { hideOthers } from './index.js'
import { findObj } from './index.js'
import { findTask } from './index.js'
import { findObject } from './index.js'


//dom elements on task
let navList = document.querySelector('[data-lists]');
let main = document.querySelector('.task-cards');
let userList = document.querySelector('[data-name=user-list]');
let submitList = document.querySelector('.submit-list');
//task add
let addTaskBtn = document.querySelector('.add-task');
 //list nav
let listHolder = document.querySelector('[data-lists]');
//array to store projects
let lists = [];
let selectedObj;
submitList.addEventListener('click',(e)=>{

    e.preventDefault();
    let userInput = userList.value;
    lists.push(CreateList(userInput))
    let index = Number(lists.length) - Number(1)
    displayList(lists,navList)
    displayCard(lists[index],main)
   });

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
        let id =Number(e.target.dataset.newName);
        //lists hold array of object we get current object by decreade  1 to it's length 
        let selectedobj = findObj(lists,id)
        let selectedTask = findTask(selectedobj,id)

        //get clicked task input using it's dataset 
        let userTaskName = document.querySelector(`[data-new-name='${id}']`);
        
        //on change event update that task object name it has similar index to dataset
        userTaskName.addEventListener('change',e=>{
               if(userTaskName.value == '') return  userTaskName.value = "no name"
                   selectedTask.name = userTaskName.value
                   userTaskName.textContent = selectedTask.name
                   //save
        });
    }
      //when edit btn clicked on task display task detail
    if(e.target.matches('.edit-task')){
          let id = e.target.parentElement.dataset.showDetail
          let taskHolder = document.querySelector(`[data-about-task='${id}'`)
          //hide others
          let nodeList = document.querySelectorAll('.task-detail-holder')
              hideOthers(nodeList,taskHolder);
              
    }
         //get date value on change event
    if(e.target.matches('[data-task-date]')){
            let id = e.target.dataset.dateInput
            //get clicked date input
            let userDate = document.querySelector(`[data-date-input='${id}']`);
            //add eventListener to it and update task object value
                userDate.addEventListener('change',e=>{
                    let selectedobj = findObj(lists,id)
                    let selectedTask = findTask(selectedobj,id)
                    //save
                    let updateDate = selectedTask.date = userDate.value
                    //summerize  the task due date
                    let dueDate = document.querySelector(`[data-due-date ='${id}']`);
                    //use object to update
                        dueDate.textContent = selectedTask.realDate
                        //save
                });
    }
         //event on priority form
    if(e.target.matches('.task-priority-form')){
            let id = Number(e.target.dataset.priority)
            let selectedobj = findObj(lists,id)
            let selectedTask = findTask(selectedobj,id)
            let prioritySelect  = document.querySelector(`[data-priority='${id}']`);
            //task name style will be changed
            let taskname =  document.querySelector(`[data-new-name='${id}']`);
                selectedTask.priority = prioritySelect.value
                 //display the color
                 taskname.style.backgroundColor = selectedTask.taskFlag;
                //save 
    }
             //event on detail input about the task
    if(e.target.matches('.task-description')){
            let id = Number(e.target.dataset.detail);
            let selectedobj = findObj(lists,id)
            let selectedTask = findTask(selectedobj,id)
            let userTaskDetail =  document.querySelector(`[data-detail='${id}']`);
                //use on change event
                userTaskDetail.addEventListener('change',e=>{
                      //update the detail and save
                        selectedTask.detail = userTaskDetail.value;
                        userTaskDetail.textContent = selectedTask.userTaskDetail;
                });
    }
      if(e.target.matches('[data-task-checkbox')){
            let id = Number(e.target.dataset.checkbox);
            let selectedobj = findObj(lists,id);
            let selectedTask = findTask(selectedobj,id);
            //add event on checkbox and update if task is complete or not
            let userTaskStatus = document.querySelector(`[data-checkbox='${id}']`);
                    userTaskStatus.addEventListener('change',(e) => {
                        //set task complete to true or false and use that to change count
                        selectedTask.complete = userTaskStatus.checked;
                        let alltask = selectedobj.tasks.filter(task=> task.complete == true)
                        //card task completed count has same id as object id
                        let projetTasks = document.querySelector(`[data-completed-task='${selectedobj.id}']`);
                            selectedobj.tasksFinished = alltask.length;
                            projetTasks.textContent = selectedobj.count;
                        //save
                    });

                } 
      if(e.target.matches('[data-delete-icon')){
            let id = e.target.parentElement.dataset.deleteTask;
            let selectedobj = findObj(lists,id);
            let selectedTask = findTask(selectedobj,id)
            
            //remove task holder div and remove that task from the selected object permanently
            let userTaskDelete = document.querySelector(`[data-task-holder='${id}']`);
            let taskIndex = selectedobj.tasks.indexOf(selectedTask);
                            selectedobj.tasks.splice(taskIndex,1);
                            userTaskDelete.remove();
        }     
        if(e.target.matches('[data-edit-project]')){
            let id = Number(e.target.parentElement.dataset.editName);
            let selectedobj = findObject(lists,id)
            let projectName = document.querySelector(`[data-project-name='${id}']`);
            let projectList =  document.querySelector(`[data-list='${id}']`);
                 projectName.focus();
                 projectName.addEventListener('change',e=>{
                    let orignalValue = projectName.value
                    if((projectName.value == '')==true){return projectName.value = orignalValue}
                    selectedobj.name = projectName.value
                    projectList.textContent = selectedobj.name

                    
                  
                 });
                
                 

        }  
        if(e.target.matches('[data-delete-project]')){
            let id = Number(e.target.parentElement.dataset.deleteCard);
            let selectedobj = findObject(lists,id)
            let projectIndex = lists.indexOf(selectedobj);
            let projectCard = document.querySelector(`[data-card='${id}']`);
            let projectList =  document.querySelector(`[data-list='${id}']`);
            console.log(projectCard)
                 projectCard.remove();
                 projectList.remove()
                 lists.splice(projectIndex,1);
                 console.log(lists)

            
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
          currentCard.appendChild(taskTemplate(selectedobj.tasks));
          
    });
