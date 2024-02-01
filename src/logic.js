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
import { formatDistanceToNow } from 'date-fns'
import { defaultArray } from './index.js'



let navList = document.querySelector('[data-lists]');
let main = document.querySelector('.task-cards');
let userList = document.querySelector('[data-name=user-list]');
let submitList = document.querySelector('.submit-list');
//list nav
let listHolder = document.querySelector('[data-lists]');
//localStorage.clear()
//key for to store the array
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedObj;
//id set in dataset
let id;
let selectedTask;
//save the array to local storage
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
   }
   //run default todo
  if(lists.length == 0){
    //console.log(defaultArray())
    lists.push(defaultArray())
  }
//show if our lists array has saved projects and tasks
if(lists.length >= 1){
    let index = Number(lists.length) - Number(1)
     displayList(lists,navList)
     displayCard(lists[index],main)
     //find the last item object from the lists array using it's id
     selectedObj = findObject(lists,lists[index].id);
    //display the tasks from that object
    let currentCard = document.querySelector(`[data-task-store='${selectedObj.id}']`);
        currentCard.textContent = '';
        currentCard.appendChild(taskTemplate(selectedObj.tasks));
    }

//event on to add project
submitList.addEventListener('click',(e)=>{
    e.preventDefault();
    let userInput = userList.value;
    if(userList.value == '')return
    lists.push(CreateList(userInput))
    let index = Number(lists.length) - Number(1)
    save()
    displayList(lists,navList)
    displayCard(lists[index],main)
    userList.value = '';
});

main.addEventListener('click',(e)=>{
    
    if(e.target.matches('.add-task')){
        e.preventDefault();
        //on the card we had the same dataset id number as the add btn,and same with selected list object
        id =Number(e.target.dataset.parentCard);
        let currentCard = document.querySelector(`[data-task-store='${id}']`);
        let taskName = document.querySelector('[data-task-name]');
            if(taskName.value == '') return
          selectedObj = lists.find(list=> list.id == id);
            selectedObj.tasks.push(CreateTask(taskName.value))
            save()
            currentCard.textContent = ''
            currentCard.appendChild(taskTemplate(selectedObj.tasks));
            taskName.value = ''
     }
    if(e.target.matches('[data-user-task-name]')){
        id =Number(e.target.dataset.newName);
        selectedObj = findObj(lists,id)
        selectedTask = findTask(selectedObj,id)
        //get clicked task input using it's dataset 
        let userTaskName = document.querySelector(`[data-new-name='${id}']`);
        //on change event update that task object name it has similar index to dataset
        userTaskName.addEventListener('change',e=>{
               if(userTaskName.value == '') return  userTaskName.value = "no name"
                   selectedTask.name = userTaskName.value;
                   userTaskName.textContent = selectedTask.name;
                   //save
                   save()
        });
    }
      //when edit btn clicked on task display task detail
    if(e.target.matches('.edit-task')){
          id = e.target.parentElement.dataset.showDetail
          let taskHolder = document.querySelector(`[data-about-task='${id}'`)
          //hide others
          let nodeList = document.querySelectorAll('.task-detail-holder')
              hideOthers(nodeList,taskHolder);
              
    }
         //get date value on change event
    if(e.target.matches('[data-task-date]')){
            id = e.target.dataset.dateInput
            //get clicked date input
            let userDate = document.querySelector(`[data-date-input='${id}']`);
            //add eventListener to it and update task object value
                userDate.addEventListener('change',e=>{
                    selectedObj = findObj(lists,id)
                    selectedTask = findTask(selectedObj,id)
                    //summerize  the task due date
                    let dueDate = document.querySelector(`[data-due-date ='${id}']`);
                    selectedTask.date = formatDistanceToNow(new Date(userDate.value),{addSuffix:true});
                    //use object to update
                    dueDate.textContent = selectedTask.date;
                    //save
                    save()
                });
    }
         //event on priority form
    if(e.target.matches('.task-priority-form')){
            id = Number(e.target.dataset.priority)
            selectedObj = findObj(lists,id)
            selectedTask = findTask(selectedObj,id)
            let prioritySelect  = document.querySelector(`[data-priority='${id}']`);
            //task name style will be changed
            let taskname =  document.querySelector(`[data-new-name='${id}']`);
                selectedTask.priority = prioritySelect.value
                //display the color
                 taskname.style.backgroundColor = selectedTask.priority;
                 //save  the object update
                 save()
    }
             //event on detail input about the task
    if(e.target.matches('.task-description')){
            id = Number(e.target.dataset.detail);
            selectedObj = findObj(lists,id)
            selectedTask = findTask(selectedObj,id)
            let userTaskDetail =  document.querySelector(`[data-detail='${id}']`);
                //use on change event
                userTaskDetail.addEventListener('change',e=>{
                      //update the detail and save
                        selectedTask.detail = userTaskDetail.value;
                        userTaskDetail.textContent = selectedTask.detail;
                        save()
                });
    }
    if(e.target.matches('[data-task-checkbox')){
            id = Number(e.target.dataset.checkbox);
            selectedObj = findObj(lists,id);
            selectedTask = findTask(selectedObj,id);
            //add event on checkbox and update if task is complete or not
            let userTaskStatus = document.querySelector(`[data-checkbox='${id}']`);
                 userTaskStatus.addEventListener('change',(e) => {
                 //set the complete to checked if true when render the input mark will be checked
                userTaskStatus.checked == true ?  selectedTask.complete = 'checked': selectedTask.complete =''
                        let alltask = selectedObj.tasks.filter(task=> task.complete == 'checked')
                        //the card count has same id as object id
                        let projetTasks = document.querySelector(`[data-completed-task='${selectedObj.id}']`);
                            selectedObj.completed = alltask.length ;
                        //update the count 
                         alltask.length == 1 ? projetTasks.textContent =
                          `${selectedObj.completed} task completed 🎯` : projetTasks.textContent = 
                          `${selectedObj.completed} tasks completed 🚀`
                        // save
                        save()
                    });
    } 
    if(e.target.matches('[data-delete-icon')){
             id = e.target.parentElement.dataset.deleteTask;
             selectedObj = findObj(lists,id);
             selectedTask = findTask(selectedObj,id);
            //remove task holder div and remove that task from the selected object permanently
            let userTaskDelete = document.querySelector(`[data-task-holder='${id}']`);
            let taskIndex = selectedObj.tasks.indexOf(selectedTask);
                            selectedObj.tasks.splice(taskIndex,1);
                            userTaskDelete.remove();
                            save()
        }     
    if(e.target.matches('[data-edit-project]')){
            id = Number(e.target.parentElement.dataset.editName);
            selectedObj = findObject(lists,id)
            let projectName = document.querySelector(`[data-project-name='${id}']`);
            let projectList =  document.querySelector(`[data-list='${id}']`);
                projectName.focus();
                projectName.addEventListener('change',e=>{
                    let orignalValue = projectName.value;
                    if((projectName.value == '')==true){return projectName.value = orignalValue}
                        selectedObj.name = projectName.value;
                        projectList.textContent = selectedObj.name;
                    save()
                 });
    }  
    if(e.target.matches('[data-delete-project]')){
            id = Number(e.target.parentElement.dataset.deleteCard);
            selectedObj = findObject(lists,id)
            let projectIndex = lists.indexOf(selectedObj);
            let projectCard = document.querySelector(`[data-card='${id}']`);
            let projectList =  document.querySelector(`[data-list='${id}']`);
            //remove the nav list and card and the object from array
                 projectCard.remove();
                 projectList.remove()
                 lists.splice(projectIndex,1);
                 save()
                 //display the rest
                 if(lists.length >= 1){
                     displayCard(lists[Number(lists.length) - Number(1)],main)
                 }
    } 
});
//when the list clicked get the id of that list find that object and display it with it's tasks 

listHolder.addEventListener('click',(e)=>{
      //get clicked list dataset it has same id with the object
      id = Number(e.target.dataset.list);
      selectedObj = lists.find(list=> list.id == id);
      displayCard(selectedObj,main)
      //append  tasks to related project using id
      let currentCard = document.querySelector(`[data-task-store='${id}']`);
          currentCard.appendChild(taskTemplate(selectedObj.tasks));
});
   
   
   
   
