import './style.css'
import { CreateTask } from './index.js'
import { CreateList } from './index.js'

import { displayList } from './index.js'
import { displayCard } from './index.js'
import {taskTemplate} from './index.js'
import { displayTask } from './index.js'

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
          
       currentCard.appendChild(taskTemplate(selectedobj.tasks))
          
        console.log(selectedobj)
          
          
      
    
      }
    //console.log(lists.find(list=> list.id === clickedList))
})
listHolder.addEventListener('click',(e)=>{
    let id = Number(e.target.dataset.list)
    let selectedobj = lists.find(list=> list.id == id);
    displayCard(selectedobj,main)
    let currentCard = document.querySelector(`[data-task-store='${id}']`);
    console.log(id)
    currentCard.appendChild(taskTemplate(selectedobj.tasks))
    
})
