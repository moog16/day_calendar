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
  var endTimesSorted = events.map(function(e, i, events) {
    return e.end;
  }).sort();
  console.log(endTimesSorted);

  for(var i=0; i<events.length; i++) {
    var e = events[i];
    var elem = createDiv('appointment');
    var endTime = 0;


    elem.style.height = e.end - e.start + 'px';


    elem.style.top = e.start + 'px';

    calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
  }
}


// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
{start: 560, end: 620},
{start: 540, end: 600}, 
{start: 30, end: 150},
{start: 90, end: 150}, 
{start: 610, end: 670} ];

layOutDay(events);


// can I assume that the events will be in chronological order?