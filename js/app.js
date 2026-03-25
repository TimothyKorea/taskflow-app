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


const taskLists = JSON.parse(localStorage.getItem('taskLists')) || [];

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
        name: taskInput.value,
        dueDate: dateInput.value,
        complete: false
    })

    saveTasks();

    taskInput.value = '';
    dateInput.value = '';

    render();
})

function saveTasks(){
    localStorage.setItem('taskLists',JSON.stringify(taskLists));
}


function render() {
    let taskListHtml = '';

    for(let i = 0; i < taskLists.length; i++) {
        let eachTask = taskLists[i];
        const {name, dueDate} = eachTask;

        let completedClass = '';

        if(eachTask.complete === true) {
            completedClass = 'render-task__task-completed';
        }

        // my checkbox state
        let isChecked = '';

        if(eachTask.complete === true) {
            isChecked = 'checked';
        }

        const html = `
        <div class="render-task__dflex">
            <div class="render-task__content">
                <input type="checkbox" class="render-task__checkbox" data-index="${i}" ${isChecked}>

                <div class="render-task__text ${completedClass}">
                    <p class="render-task__title">${name}</p>
                    <p class="render-task__date">${dueDate}</p>
                </div>
            </div>

            <button class="render-task__delete-btn" onclick="deleteTask(${i})">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" cursor="pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M5 6l1 14h12l1-14"/></svg>
            </button> 
        </div>
        `;
        taskListHtml += html;
    }

    renderOnWebpage.innerHTML = taskListHtml;
    attachEvents();
}

function deleteTask(index){
    taskLists.splice(index, 1);
    saveTasks();
    render();
}

taskInput.addEventListener('input', function(){
    taskjsErrorMessage.textContent = "";
})

dateInput.addEventListener('input', function(){
    datejsErrorMessage.textContent = "";
})

 render();

function attachEvents() {
    const checkbox = document.querySelectorAll('.render-task__checkbox');
    for (let i = 0; i < checkbox.length; i++) {
        let eachCheckBox = checkbox[i];

        eachCheckBox.addEventListener('change', function(){
            const index = this.dataset.index;

            if(this.checked === true){
                taskLists[index].complete = true;
            }

            else{
                taskLists[index].complete = false;
            }

            saveTasks();
            render();
        })
    }
}