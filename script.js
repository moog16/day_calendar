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

function renderAppointments(calendar, events) {
  

  events = events.sort(function(eventA, eventB) {
    return eventA.start - eventB.start;
  });

  for(var i=0; i<events.length; i++) {
    var e = events[i];
    var calEvent = new CalEvent(e.start, e.end);

    calEvent.createAndSetPosition(calendar);
  }
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