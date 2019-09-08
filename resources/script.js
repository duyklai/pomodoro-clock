//Script for pomodoro-clock
const workDisplay = document.querySelector('#workDisplay');
const restDisplay = document.querySelector('#restDisplay');
var workSelected, restSelected;
var workTimer, restTimer;
var workDone = false;
var timerStarted = false;
var breakSound = new Audio('resources/breakTime.mp3');
breakSound.volume(0.8);
var workSound = new Audio('resources/workTime.mp3');
workSound.volume(0.8);

const startTimer = function()
{
    // If check to disable "start" button spam
    if(!timerStarted)
    {
        // Set boolean check for collecting and changing times
        timerStarted = true;
        // Set the timeSelected variable to the selected count down time
        getTimeSelected();
        
        // Setting up two variables for current and x minutes away
        var currentTime = new Date().getTime();
        var countDown = new Date();
        countDown.setTime(currentTime + (workSelected * 60 * 1000));

        workTimer = setInterval(function() 
        {
            // Update time
            currentTime = new Date().getTime();
            
            // Finding the difference
            var diff = countDown - currentTime;

            // Time calculations for minutes and seconds
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            seconds = ("0" + seconds).slice(-2);
            
            // Output the result on Work Time display
            workDisplay.innerHTML = minutes + ":" + seconds;
            
            // If the count down is over
            if (diff < 0) 
            {
                clearInterval(workTimer);
                workDisplay.innerHTML = "0:00";
                workDone = true;
                breakSound.play();

                // Getting new time information for rest time
                currentTime = new Date().getTime();
                countDown = new Date();
                countDown.setTime(currentTime + (restSelected * 60 * 1000));

                // Start rest timer
                restTimer = setInterval(function() 
                {
                    // Update time
                    currentTime = new Date().getTime();
                    
                    // Finding the difference
                    var diff = countDown - currentTime;

                    // Time calculations for minutes and seconds
                    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    seconds = ("0" + seconds).slice(-2);
                    
                    // Output the result on Rest Time display
                    restDisplay.innerHTML = minutes + ":" + seconds;
                    
                    // If the count down is over
                    if (diff < 0) 
                    {
                        clearInterval(workTimer);
                        restDisplay.innerHTML = "0:00";
                        workDone = false;
                        workSound.play();
                    }
                }, 1000);
            }
        }, 1000);
    }
}

// Getting the selected time from user, putting them into variable
// Will only be ran once the start button has been pushed
const getTimeSelected = function()
{
    var tempLength = workDisplay.innerHTML.length;
    workSelected = +(workDisplay.innerHTML.substr(0, tempLength - 3));
    tempLength = restDisplay.innerHTML.length;
    restSelected = +(restDisplay.innerHTML.substr(0, tempLength - 3));
}

// Reset display, timers, and booleans for checks
const reset = function()
{
    clearInterval(workTimer);
    clearInterval(restTimer);
    timerStarted = false;
    workDone = false;
    workDisplay.innerHTML = workSelected + ":00";
    restDisplay.innerHTML = restSelected + ":00";
}

// Initial function for determining change of time; passed in incr or decr and the button element itself
const changeTime = function(change, e)
{
    // If we want to increase time
    if(change == "up")
    {
        // Find out from which time div
        if(e.parentNode.id.includes("rest"))
        {
            increaseTime(restDisplay);
        }
        else if(e.parentNode.id.includes("work"))
        {
            increaseTime(workDisplay);
        }
    }
    else if(change == "down")   // If we want to decrease time
    {
        // Find out from which time div
        if(e.parentNode.id.includes("rest"))
        {
            decreaseTime(restDisplay);
        }
        else if(e.parentNode.id.includes("work"))
        {
            decreaseTime(workDisplay);
        }
    }
}

// Function for increasing the time on the display
const increaseTime = function(disp)
{
    // Make sure display cannot be changed once timer has started
    if(!timerStarted)
    {
        var tempLength = disp.innerHTML.length;
        var minutes = disp.innerHTML.substr(0, tempLength - 3);
        if(+(minutes) < 60)
        {
            minutes = +(minutes) + 1;
            disp.innerHTML = minutes + ":00";
        }
    }
}

// Function for decrease the time on the display
const decreaseTime = function(disp)
{
    // Make sure display cannot be changed once timer has started
    if(!timerStarted)
    {
        var tempLength = disp.innerHTML.length;
        var minutes = disp.innerHTML.substr(0, tempLength - 3);
        if(+(minutes) > 1)
        {
            minutes = +(minutes) - 1;
            disp.innerHTML = minutes + ":00";
        }
    }
}



