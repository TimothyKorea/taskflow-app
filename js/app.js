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