const inputContainer = document.getElementById('input-container');
const countdownForm= document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
let coundownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let savedCoundown;
const countdownEl = document.getElementById('countdown');
const countdownElTitle= document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span');
let countdownActive;
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// set date input minimu

const today = new Date().toISOString().split('T')[0];

// populate countdown and complete ui
function updateDOM() {
    countdownActive = setInterval(()=> {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance%day)/hour);
    const minutes = Math.floor((distance%hour)/minute);
    const seconds = Math.floor((distance%minute)/second);
 
    //hide input
    inputContainer.hidden = true;
 
   

    

    //hide input
    inputContainer.hidden = true;
    //show coundown 
    countdownEl.hidden = false;
     //if the countdown has ended, show complete
     if(distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent =`${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;

    } else {
        //else show countdown in  progress
        //populate coumtdown
        countdownElTitle.textContent = `${countdownTitle}` ;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;    
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }; 

    }, second);


}

//take value from input form
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCoundown = {
        title: coundownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCoundown) )
    // console.log(countdownTitle, countdownDate);
    //check for valid date
    if(countdownDate === '') {
        alert('Please select a date')
    } else {
          // get numbet value of date
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

//reset all values 
function reset() {
    //hide countdowns, show inpuut

    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //stop countdown
    clearInterval(countdownActive);
    //reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCoundown =  JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCoundown.title;
        countdownDate = savedCoundown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();


    }
}

// event listener

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//on loda check local storage

restorePreviousCountdown()