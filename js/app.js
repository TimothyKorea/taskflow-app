const mobileFilter = document.querySelector('.main-content__mobile-filter');
const mobileSidebar = document.querySelector('.side-bar');
const closeIcon = document.querySelector('.sidebar-close-icon');

mobileFilter.addEventListener('click', function(){
    mobileSidebar.classList.add('active');
})

closeIcon.addEventListener('click', function(){
    mobileSidebar.classList.remove('active');
})


const filterBtn = document.querySelectorAll('.side-bar__filter-btn');

    for(let i = 0; i < filterBtn.length; i++) {
        let eachFilterBtn = filterBtn[i];

        eachFilterBtn.addEventListener('click', function(){
            for(let c = 0; c < filterBtn.length; c++){
                filterBtn[c].classList.remove('active');
            }

            this.classList.add('active');
        })
    }


const taskInput = document.querySelector('.main-content__task-input');
const dateInput = document.querySelector('.main-content__date-input');
const addBtn = document.querySelector('.main-content__add-btn');
const renderOnWebpage = document.querySelector('.render-task');
const taskjsErrorMessage = document.querySelector('.main-content__task-error-msg');
const datejsErrorMessage = document.querySelector('.main-content__date-error-msg');


const taskLists = [];

addBtn.addEventListener('click', function(){
    if(!taskInput.value.trim()){
        taskjsErrorMessage.textContent = "Add a task to continue.";
        return;
    }

    if(!dateInput.value){
        datejsErrorMessage.textContent = "Please pick a date";
        return;
    }

    taskLists.push({
        name : taskInput.value,
        dueDate: dateInput.value
    })

    taskInput.value = '';
    dateInput.value = '';

    render();
})


function render() {
    let taskListHtml = '';

    for(let i = 0; i < taskLists.length; i++) {
        let eachTask = taskLists[i];
        const {name, dueDate} = eachTask;
        const html = `
         <p class="render-task__title">${name}</p>
         <p class="render-task__date">${dueDate}</p>
         <button class="render-task__delete-btn" onclick="deleteTask(${i})">Delete</button>
        `;
        taskListHtml += html;
    }

    renderOnWebpage.innerHTML = taskListHtml;
}

function deleteTask(index){
    taskLists.splice(index, 1);
    render();
}
