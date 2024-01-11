import './style.css' 


//factory function to create task using user input 
      function Todo(name,detail,date){
                  return{name,detail,date}
            }
//function to add info of task  to the  array and return array
      function addtoArray(array){
            //form values
            const todoTitle =document.querySelector("[data-todo ='todo-title']").value;
            const todoDetail =document.querySelector("[data-todo ='todo-detail']").value;
            const todoDate =document.querySelector("[data-todo ='todo-date']").value;
            if(todoTitle == '')return
            //creat using obj
            let newTodo = Todo(todoTitle,todoDetail,todoDate);
               array.push(newTodo);
          return array
       }
 //function to create card using array stored info about task to hold list name and
 // add task btn to create task related to it and return fragment
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
                        let random = Math.floor(Math.random()*30)
                  newCard.dataset.card= random;
                        fragment.appendChild(newCard)
                  });
            return fragment
      }

// function to create task with the task name,it's detail and due date elements
// to show about the task using array and return fragment
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
                taskHolder.dataset.index = array.indexOf(element)
                  taskFragment.appendChild(taskHolder);
            });
           return taskFragment
      }
//function to accept 2 arry one store clicked element dataset number used to get element 
// second array store obj about the task  and we create task and using createTask function and append it to clicked elment                         
       function display(datasetArray,taskArray){
            datasetArray.forEach(element => {
                  let elementDataseet = Number(element)
                  let clickedElemnt = document.querySelector(`[data-card='${elementDataseet}']`);
                  clickedElemnt.appendChild(createTask(taskArray)) 
            });
      }  

//create the card with input form
     const listFormDiv = document.querySelector('.list-form');
     const listform = document.querySelector('.add-list')
     const userList = document.querySelector('[data-name="user-list"]')
     const taskCard = document.querySelector('.task-cards');
     const formDiv = document.querySelector('.task-form-holder');
     const formTask = document.querySelector('.create-card');
     //store clicked card number .list,and task in array
     let list = []
     let task = []
     let card= []

     listform.addEventListener('click',(e)=>{
     
            if(e.target.matches('.submit-list')){
                  e.preventDefault()
                //store list name and put it in array
                  list.push(userList.value)
                 //create card using stored list name 
                 taskCard.appendChild(createToDoCard(list));
                  //clear input and hide form
                  userList.value = ''
                  // listFormDiv.style.display = 'none'
                  list  =[]
             }
       })
     //using event delgation  we get card dataset then store it in card array
      taskCard.addEventListener('click',(e)=>{
            
            if(e.target.matches('.add-task')){
                  let num = e.target.parentNode.dataset.card
                  //pop up the form 
                  formDiv.style.display = 'block'

                  //add event on form
                  formTask.addEventListener('click',(e)=>{
                        e.preventDefault()

                  //protect to append task on different list when display so remove previous clicked 
                  //(e.target)element from card array
                        if(card.length >= 2) return card = card.slice(-1)
                              
                              //grab the form input and  create obj using addtoArray function and store it in task array
                              addtoArray(task)
                              display(card,task)
                              task=[]
                              let todoTitle =document.querySelector("[data-todo ='todo-title']");
                              let todoDetail =document.querySelector("[data-todo ='todo-detail']");
                              let todoDate =document.querySelector("[data-todo ='todo-date']");
                                    todoTitle.value= '';
                                    todoDetail.value = '';
                                    todoDate.textContent = '';
                                    //hide form 
                              formDiv.style.display = 'none';
                   }) 
            }
                      
      })  
                              
                
                       
      
       
     
       
    

    

   
    

    
                                  
                    
              
               

               



 


