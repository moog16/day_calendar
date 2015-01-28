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
  var calendarEvents = [];

  function createNewBucket(buckets, calEvent) {
    buckets.push({
      parentEvent: new CalEvent(calEvent.start, calEvent.end),
      events: [calEvent]
    });
  }

  // create event objects
  for(var i=0; i<events.length; i++) {
    var e = events[i];
    var id = Math.floor(new Date().valueOf()* Math.random());
    var calEvent = new CalEvent(e.start, e.end, id);
    calEvent.createAndSetPosition(calendar);
    calendarEvents.push(calEvent);
  }

  // have the calEvent be aware of the other overlapping events 
  // by the otherEvents into an array
  for(var i=0; i<calendarEvents.length; i++) {
    var calEvent = calendarEvents[i];
    for(var j=0; j<calendarEvents.length; j++) {
      var otherEvent = calendarEvents[j];
      if(otherEvent.id === calEvent.id) {
        continue;
      } else if(calEvent.isOverlapping(otherEvent)) {
        calEvent.overlappingEvents.push(otherEvent);
      }
    }
  }

  // sort events by number of overlapping events 
  var sortedByNumberOfOverlaps = calendarEvents.sort(function(a, b) {
    return a.overlappingEvents.length - b.overlappingEvents.length;
  });

  // iterate through all sortedByNumberOfOverlaps  
  // and set widths and left pos

  debugger;

}



// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
// {start: 150, end: 600}, 
{start: 560, end: 620},
{start: 540, end: 600}, 
{start: 90, end: 150},
{start: 90, end: 200}, 
{start: 610, end: 670} ];

[150, 600, 620, 670]

layOutDay(events);
