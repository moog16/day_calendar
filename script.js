function layOutDay(events) {
  var calendar = document.getElementById('calendar');
  var W = 600;

  function getCalendarEvents(events) {
    var calendarEvents = [];
    for(var i=0; i<events.length; i++) {
      var e = events[i];
      var id = Math.floor(new Date().valueOf()* Math.random());
      var calEvent = new CalEvent(e.start, e.end, id, e.a);
      calendarEvents.push(calEvent);
    }
    return calendarEvents;
  }


  calendar.appendChild(createDiv('calendar-day-layout'));

  var calendarEvents = getCalendarEvents(events);
  // sort by start and end times
  calendarEvents.sortByStartAndEndTimes();

  //set overlapping events
  for(var i=0; i<calendarEvents.length; i++) {
    calendarEvents[i].setOverlappingEvents(calendarEvents);
  }

  // find largest array of common overlaps and set on
  // calEvent.largestRow
  for(var i=0; i<calendarEvents.length; i++) {
    var calEvent = calendarEvents[i];
    calEvent.setLargestRow(); 
  }

  var sortedLargestRowByStartDate = calendarEvents.sort(function(a, b) {
    return b.largestRow.length - a.largestRow.length;
  });

  // need to set width for largest rows, since 
  // largest row size will determine width
  for(var i=0; i<sortedLargestRowByStartDate.length; i++) {
    var calEvent = sortedLargestRowByStartDate[i];
    calEvent.setWidth(W);
  }

  // set position/lefts
  for(var i=0; i<sortedLargestRowByStartDate.length; i++) {
    var calEvent = sortedLargestRowByStartDate[i];
    calEvent.setPosition(W);
  }

  //apply offset for UI
  for(var i=0; i<sortedLargestRowByStartDate.length; i++) {
    sortedLargestRowByStartDate[i].applyOffset(75);
  }

  // render on display
  for(var i=0; i<sortedLargestRowByStartDate.length; i++) {
    var calEvent = sortedLargestRowByStartDate[i];
    calEvent.plotEvent(calendar);
  }
  debugger;
}



// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
{start: 560, end: 620, a:'C'},
{start: 540, end: 600, a:'B'}, 
{start: 610, end: 670, a:'A'}, 
{start: 150, end: 600, a: 'D'},
{start: 90, end: 150},
{start: 90, end: 200}, 
{start: 100, end: 180},
{start: 190, end: 220},
];

renderTimes(calendar);
layOutDay(events);
