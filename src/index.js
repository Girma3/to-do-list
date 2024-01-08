import './style.css'
//function to create card to hold list name and add task btn to create task related to it
function createToDoCard(listname){
     const newCard = document.createElement('div');
           newCard.classList.add('card')  
  
     const taskDiv = document.createElement('div');
           taskDiv.classList.add('list-holder');

        

     const listName = document.createElement('h2');
           listName.textContent = `${listname}`;

     const btnHolder = document.createElement('div');
            btnHolder.classList.add('list-btn') 

     const editBtn = document.createElement('button');
           editBtn.classList.add('edit-list');

      const editIcon = document.createElement('i');
           editIcon.setAttribute('class','fa-regular fa-pen-to-square'); 
           
           editBtn.appendChild(editIcon)

     const deleteBtn = document.createElement('button');
           editBtn.classList.add('delete-list');

     const deleteIcon =  document.createElement('i');
           deleteIcon.setAttribute('class',"fa-solid fa-trash");

     const addTask = document.createElement('button');
           addTask.textContent = '+ Add Task'
           addTask.classList.add('add-task')

           deleteBtn.appendChild(deleteIcon)

            btnHolder.appendChild(editBtn);
            btnHolder.appendChild(deleteBtn);

            taskDiv.appendChild(listName);
            taskDiv.appendChild(btnHolder); 
            
            newCard.appendChild(taskDiv);
            newCard.appendChild(addTask);
     const fragment = document.createDocumentFragment();
           fragment.appendChild(newCard)

      return fragment
}

// function to create task with the task name,it's detail and due date elements to show about the task 
function createTask(){
     const taskHolder = document.createElement('div');
           taskHolder.classList.add('task-holder');

     const taskHeader = document.createElement('div');
           taskHeader.classList.add('task-intro');

      const taskIntro = document.createElement('div');
            taskIntro.classList.add('task-head');

      const taskInput = document.createElement('input');
             taskInput.setAttribute('type','checkbox');
             taskInput.setAttribute('id','task-status');
             taskInput.setAttribute('name','task-status');
             taskInput.setAttribute('class','task-checkbox');

   

     const title = document.createElement('span');
           title.classList.add('task-title');
           title.textContent = 'gymmmm'

     const btnHolder = document.createElement('div');
            btnHolder.classList.add('task-btns');

     const editBtn = document.createElement('button');
                  editBtn.classList.add('edit-task');
                    
     const editIcon = document.createElement('i');
            editIcon.setAttribute('class','fa-regular fa-pen-to-square');

            editBtn.appendChild(editIcon);

     const deleteBtn = document.createElement('button');
            editBtn.classList.add('delete-task');       
  
     const deleteIcon =  document.createElement('i');
            deleteIcon.setAttribute('class',"fa-solid fa-trash");  
            
            deleteBtn.appendChild(deleteIcon)
            
     const taskDetail = document.createElement('div');
           taskDetail.classList.add('task-container');
           
     const taskDescription = document.createElement('div');
           taskDescription.classList.add('task-detail');
           taskDescription.textContent = 'aaaaaaaaa'
           
     const dueDate = document.createElement('div');
           dueDate.classList.add('task-date');
           dueDate.textContent = '2 33 444'
           
           btnHolder.appendChild(editBtn);
           btnHolder.appendChild(deleteBtn);

           taskIntro.appendChild(taskInput);
           taskIntro.appendChild(title);

           taskHeader.appendChild(taskIntro);
           taskHeader.appendChild(btnHolder);
           
           taskDetail.appendChild(taskDescription);
           taskDetail.appendChild(dueDate);

           taskHolder.appendChild(taskHeader);
           taskHolder.appendChild(taskDetail);

         //create fragment and attach the task element to it
           let taskFragment = document.createDocumentFragment();
                taskFragment.appendChild(taskHolder);
           
          return taskFragment
}

//create the card with input form
     const listForm = document.querySelector('.list-form');
     listForm.addEventListener('click',(e)=>{
          if(e.target.matches('.submit-list')){
               e.preventDefault();
               //grab the input and create by calling create card function and append it 
               const listTitle = document.querySelector('[data-name = user-list]');
               const taskCard = document.querySelector('.task-cards');
              

    
               taskCard.appendChild(createToDoCard(listTitle.value))
              
               
               
          }
     })


// divs.appendChild(createTask())
// // show form when add task clecked
// const FormHolder = document.querySelector('.task-form-holder');
// const taskForm = document.querySelector('.task-form');
// const addTaskBtn = document.querySelector('.add-task');

// addTaskBtn.addEventListener('click',(e)=>{
//      console.log('hey')
//      FormHolder.style.display = 'block'
     
// })
