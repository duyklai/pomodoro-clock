const workDisplay = document.querySelector('#workDisplay');
const restDisplay = document.querySelector('#restDisplay');

const show = function(min)
{
    // Setting up two variables for current and x minutes away
    var currentTime = new Date().getTime();
    var countDown = new Date();
    countDown.setTime(currentTime + (min * 60 * 1000));

    var x = setInterval(function() 
    {
        // Update time
        currentTime = new Date().getTime();
        
        // Finding the difference
        var diff = countDown - currentTime;
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        workDisplay.innerHTML = minutes + ":" + seconds;
        
        // If the count down is over, write some text 
        if (diff < 0) 
        {
            clearInterval(x);
            workDisplay.innerHTML = "00:00";
        }
    }, 1000);
}

const reset = function()
{
    
}

const increaseTime = function()
{
    var minutes = workDisplay.innerHTML.substr(0,2);
    if(+(minutes) < 60)
    {
        minutes = +(minutes) + 1;
        workDisplay.innerHTML = minutes + ":00";
    }
}

const decreaseTime = function()
{
    var tempLength = workDisplay.innerHTML.length;
    var minutes = workDisplay.innerHTML.substr(0,tempLength-3);
    if(+(minutes) > 0)
    {
        minutes = +(minutes) - 1;
        workDisplay.innerHTML = minutes + ":00";
    }
}


