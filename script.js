function layOutDay(events) {
  var calendar = document.getElementById('calendar');
  var W = 600;

  renderCalendar(calendar);
}

function renderAppointments(events, height) {

}

function renderCalendar(calendar) {
  calendar.appendChild(createDiv('calendar-day-layout'));
  
  renderTimes(calendar);
}


function renderTimes(calendar) {
  calendar.insertBefore(createDiv('calendar-day-times'), calendar.firstChild);

  var dayBegin = 540;
  var dayLength = 720; // in minutes; SAME AS HEIGHT
  var dayLayout = calendar.getElementsByClassName('calendar-day-layout')[0];

  for(var i=0; i<=dayLength/30; i++) {
    var elem = createDiv('calendar-day-time');
    var minutes = dayBegin + i*30;
    var hours = minutes/60;
    var hour = Math.floor(hours%12) || '12';
    var minute = hours%1*60 || '00';
    var periodOfDay = minute !== 30 ? (minutes >= 720? 'pm' : 'am') : '';
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


var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];

layOutDay(events);
