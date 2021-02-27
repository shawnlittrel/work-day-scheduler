//insert current day into header
var rightNow = moment();
var today = rightNow.format('MMMM Do YYYY');
var currentTime  = rightNow.format('LT')
var currentHour = rightNow.set('minute', 00);
var scheduleEl = $(".hour");


$('#currentDay').text('Today is: ' + today);
$('#currentTime').text('The time is: ' + currentTime);
//put date picker into header?  will always load previous days tasks

//save button for each text box

var timeCheck = function(timeEl){
    //remove previous classes    
    $(".to-do-text").removeClass("past present future");
    
    //loop through schedule and compare i to current time, then associate classes
    for(i=7; i<19; i++){
        var hourElement = document.getElementById(i);
        //if time slot matches current hour, add present class
        if(moment(i, 'hour').isSame(currentHour, 'hour')){
            hourElement.classList.add("present");
        };

        //if time slot is after current hour, add future class
        if(moment(i, 'hour').isAfter(currentHour, 'hour')){
            hourElement.classList.add("future");
        };

        //if time slot is before current hour, add past class
        if(moment(i, 'hour').isBefore(currentHour, 'hour')){
            hourElement.classList.add("past");
        };    
    };
    
};

timeCheck(scheduleEl);

//save all tasks save button click


