//insert current day into header
var rightNow = moment();
var today = rightNow.format('MMMM Do YYYY');
var currentTime  = rightNow.format('LT')
var currentHour = rightNow.set('minute', 00);
var scheduleEl = $(".hour");
var calendar
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

//save all tasks to localStorage
var saveCal = function(){
    localStorage.setItem("calendar", JSON.stringify(calendar));
};

//parse localstorage from json, if no json start with empty array
var loadCal = function(){
    //pull JSON from localStorage
    calendarJSON = localStorage.getItem('calendar');
    //if calendarJSON exists, parse to string.  otherwise set up empty array
    if(calendarJSON){
        calendar = JSON.parse(calendarJSON);

        for(i = 7; i < 19; i++){
            // find first value in array
            var calItem = calendar.find((x => x.id === i))
            //set id value to variable
            var calId = calItem.id;
            //set text value to variable
            var calText = calItem.val;
            //identify date object was created
            var calDate = calItem.date;
            //if calendar item was created today
            if(calDate == rightNow.format('DD')){
            //set text box at id calId to text value calText
            document.getElementById(calId).value = calText;  
            }
            else{
            document.getElementById(calId).value = "";
            };
        }
    }
    //otherwise set empty text value
    else{calendar = []};
    //loop through all array items

};


//push values to array on save button click

$('.saveBtn').click(function(){
    //get values from textboxes
    for(i=7; i<19; i++){
    var calText = document.getElementById(i).value;
    var calId = i;
    var calDate = rightNow.format('DD')
    //add values and textbox id to array
    var calObj = {id: calId, val: calText, date: calDate};
    calendar.push(calObj);
}
saveCal();
});

loadCal();
timeCheck(scheduleEl);