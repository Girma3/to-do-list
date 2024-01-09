import './style.css' 
function Todo(name,detail,date){
      return{name,detail,date}
       }
     
      
       //function to add info of to do to array
       function addtoArray(array){
            //form values
            const todoTitle =document.querySelector("[data-todo ='todo-title']").value;
            const todoDetail =document.querySelector("[data-todo ='todo-detail']").value;
            const todoDate =document.querySelector("[data-todo ='todo-date']").value;
            //creat using obj
            let newTodo = Todo(todoTitle,todoDetail,todoDate);
            array.push(newTodo);
            return array
       }
    
        

//function to create card using array stored info anout task to hold list name and add task btn to create task related to it

function createToDoCard(array){
      let fragment = document.createDocumentFragment();
     
      array.forEach(item=>{
          

     
     const newCard = document.createElement('div');
           newCard.classList.add('card')  
  
     const taskDiv = document.createElement('div');
           taskDiv.classList.add('list-holder');

        

     const listName = document.createElement('h2');
           listName.textContent = `${item}`;

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
           newCard.dataset.card= array.indexOf(item);
            
            fragment.appendChild(newCard)
          
      });
      return fragment

}

// function to create task with the task name,it's detail and due date elements to show about the task using array
function createTask(array){
      //const taskCard = document.querySelector('.task-cards'); 
      let taskFragment = document.createDocumentFragment();
      array.forEach(element => {
         
     
     const taskHolder = document.createElement('div');
           taskHolder.classList.add('task-holder');

     const taskHeader = document.createElement('div');
           taskHeader.classList.add('task-intro');

      const taskIntro = document.createElement('div');
            taskIntro.classList.add('task-head');

      const taskInput = document.createElement('input');
             taskInput.setAttribute('type','checkbox');
             taskInput.setAttribute('id',`${array.indexOf(element)}`);
             taskInput.setAttribute('name','task-status');
             taskInput.setAttribute('class','task-checkbox');

   

     const title = document.createElement('span');
           title.classList.add('task-title');
           title.textContent = element.name

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
           taskDescription.textContent = element.detail
           
     const dueDate = document.createElement('div');
           dueDate.classList.add('task-date');
           dueDate.textContent = element.date
           
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
      //     
        
           taskHolder.dataset.index = array.indexOf(element)
                 
                 
                 taskFragment.appendChild(taskHolder);
                 console.log('en')
      //      return taskFragment
     // taskCard.appendChild(taskHolder)
            });
            console.log('return')
         return taskFragment
}

//create the card with input form
     const listFormDiv = document.querySelector('.list-form');
     const listform = document.querySelector('.add-list')
     const userList = document.querySelector('[data-name="user-list"]')
     const taskCard = document.querySelector('.task-cards');
     let list = []
listform.addEventListener('click',(e)=>{
     
if(e.target.matches('.submit-list')){
      e.preventDefault()
     
      //crate card and put it in array
     
      list.push(userList.value)
     taskCard.appendChild(createToDoCard(list));
      //clear input and hide form
      userList.value = ''
      // listFormDiv.style.display = 'none'
      console.log(list)
}
})
      //add event listener on cards then when clicked add task create todo with form input
      taskCard.addEventListener('click',(e)=>{
            let task = []
            
            if(e.target.matches('.add-task')){
                  ///let currentCard = document.querySelector(`[data-card='${e.target.dataset.card}']`);
                  let currentCard = e.target.parentNode.dataset.card;
                console.log(currentCard)
             
                  //pop up form the
                  
                  //when submit call create card //store tasks in an array
                  const formDiv = document.querySelector('.task-form-holder');
                  formDiv.style.display = 'block'
                  //add event on form
                  const formTask = document.querySelector('.create-card');
                  formTask.addEventListener('click',(e)=>{
                        if(e.target.matches('.create-card')){
                              e.preventDefault()
                              //grab form input create object and put it in array
                             
                              //let sub = []
                            addtoArray(task)
                            //sub.push(task.slice(-1))
                            console.log(task)
                            
                           
                            //console.log(currentCard)
                            const taskHolder = document.querySelector('.task-holder')
                           
                         //  taskHolder.textContent =''
                         let ele = document.querySelector(`[data-card='${currentCard}']`)
                         ele.textContent = ""
                            ele.appendChild(createTask(task))
                            
                           
                            //task = []
                            //clear form and clear input

                       
                            
                        } 
                  })

                  }
      })

    

   
    

    
                                  
                    
              
               

               
/*create task using user form 
  *add eventlistener on card then when (+ add task) clicked ,show form then grab user input
  * use object to create todo using form inputs
  */


 


