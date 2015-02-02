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

  function renderCalendar(calendar) {
    calendar.appendChild(createDiv('calendar-day-layout'));
    renderTimes(calendar);
  }

  renderCalendar(calendar);

  var calendarEvents = getCalendarEvents(events);

  //set overlapping events
  for(var i=0; i<calendarEvents.length; i++) {
    calendarEvents[i].setOverlappingEvents(calendarEvents);
  }

  var sortedCalendarEvents = calendarEvents.sortByStartAndEndTimes();

  debugger;

  // find largest array of common overlaps and set on
  // calEvent.maxOverlaps
  for(var i=0; i<sortedCalendarEvents.length; i++) {
    var calEvent = sortedCalendarEvents[i];
    calEvent.setMaxOverlaps(); 
  }

  var sortedMaxOverlapsByStartDate = sortedCalendarEvents.sort(function(a, b) {
    return b.maxOverlaps.length - a.maxOverlaps.length;
  });

  // need to set width for largest rows, since 
  // largest row size will determine width
  for(var i=0; i<sortedMaxOverlapsByStartDate.length; i++) {
    var calEvent = sortedMaxOverlapsByStartDate[i];
    calEvent.setWidth(W);
  }

  // set position/lefts
  for(var i=0; i<sortedMaxOverlapsByStartDate.length; i++) {
    var calEvent = sortedMaxOverlapsByStartDate[i];
    calEvent.setPosition(W);
  }

  //apply offset for UI
  for(var i=0; i<sortedMaxOverlapsByStartDate.length; i++) {
    sortedMaxOverlapsByStartDate[i].applyOffset(75);
  }

  // render on display
  for(var i=0; i<sortedMaxOverlapsByStartDate.length; i++) {
    var calEvent = sortedMaxOverlapsByStartDate[i];
    calEvent.plotEvent(calendar);
  }
  debugger;
}



// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
// {start: 560, end: 620},
// {start: 540, end: 600}, 
{start: 150, end: 600, a: 'E'},
{start: 90, end: 150, a: 'B'},
{start: 90, end: 200, a: 'A'}, 
{start: 100, end: 180, a: 'C'},
{start: 190, end: 220, a: 'D'},
// {start: 610, end: 670} 
];


layOutDay(events);
