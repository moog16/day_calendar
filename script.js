function layOutDay(events) {
  var calendar = document.getElementById('calendar');
  var W = 600;

  renderCalendar(calendar);
  renderAppointments(calendar, events)
}

function renderCalendar(calendar) {
  calendar.appendChild(createDiv('calendar-day-layout'));
  
  renderTimes(calendar);
}


function renderTimes(calendar) {
  var dayLength = 720; // in minutes; SAME AS HEIGHT
  var dayBegin = 540;
  var dayLayout = calendar.getElementsByClassName('calendar-day-layout')[0];

  calendar.insertBefore(createDiv('calendar-day-times'), calendar.firstChild);

  for(var i=0; i<=dayLength/30; i++) {
    var elem = createDiv('calendar-day-time');
    var minutes = dayBegin + i*30;
    var hours = minutes/60;
    var hour = Math.floor(hours%12) || '12';
    var minute = hours%1*60 || '00';
    var periodOfDay = minute !== 30 ? (minutes >= 720 ? 'pm' : 'am') : '';
    var time = hour + ':' + minute + periodOfDay;
    elem.textContent = time;
    elem.style.top = i*30+'px';
    document.getElementsByClassName('calendar-day-times')[0].appendChild(elem);
  }
}

function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}


function renderAppointments(calendar, events) {
  //make copy
  events = events.slice();

  function createAndSetPosition(height, top) {
    var elem = createDiv('appointment');

    elem.style.height = height + 'px';
    elem.style.top = top + 'px';
    calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
  }

  // get first event(s) - there maybe more than one event with same start time
  var firstEventStartTime = events.map(function(e, i, events) {
    return e.start;
  }).sort(function(a, b){return a-b})[0];

  var endTimesSorted = events.map(function(e, i, events) {
    return e.end;
  }).sort(function(a, b){return a-b});

  //get first event
  for(var i=0; i<events.length; i++) {
    var e = events[i];
    if(e.start === firstEventStartTime) {
      var height = e.end - e.start;
      createAndSetPosition(height, e.start);
      events[i] = []; // don't create appointment again
    }
  }

  // for(var i=0; i<events.length; i++) {
  //   var e = events[i];
  //   var endTime = 0;

  //   // position from top of day will be the closest endTime - startTime w/ position:relative
  //   for(var j=0; j<endTimesSorted.length; j++) {
  //     if(endTime)
  //     if(endTimesSorted[j] > e.start) {
  //       endTime = endTimesSorted[j-1];
  //       console.log(endTime);
  //       break;
  //     }
  //   }

  // }
}


// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
{start: 560, end: 620},
{start: 540, end: 600}, 
{start: 90, end: 150}, 
{start: 90, end: 200}, 
{start: 610, end: 670} ];

[150, 600, 620, 670]

layOutDay(events);


// can I assume that the events will be in chronological order?