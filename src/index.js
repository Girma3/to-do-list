import './style.css'
//function to create card to hold list name and add task btn
function createToDoCard(){
  

     const listName = document.createElement('h2');
          listName.textContent = 'Gym';

     const iconHolder = document.createElement('div');
            iconHolder.classList.add('list-icon')     

          const editIcon = document.createElement('i');
               editIcon.setAttribute('class','fa-regular fa-pen-to-square');

          const deleteIcon =  document.createElement('i');
               deleteIcon.setAttribute('class',"fa-solid fa-trash")
     iconHolder.appendChild(editIcon);
     iconHolder.appendChild(deleteIcon)       
    
          let items = [listName,iconHolder]  
          const fragment = document.createDocumentFragment();

          items.forEach(item => {
            console.log(fragment)
            fragment.appendChild(item);
         });

         return fragment

}
const divs = document.querySelector('.card');
divs.appendChild(createToDoCard())
