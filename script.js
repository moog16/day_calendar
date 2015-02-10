var calendar = new Calendar(600);
function layOutDay(events) {
  calendar.setCalendarEventsAndSort(events);
  var W = 600;

  calendar.clearCalendar();
  calendar.elem.appendChild(createDiv('calendar-day-layout'));

  var calendarEvents = calendar.events;
  // sort by start and end times
  calendarEvents.sortByStartAndEndTimes();

  //set overlapping events
  calendarEvents.forEach(function(calEvent) {
    calEvent.setOverlappingEvents(calendarEvents);
  });

  // find largest array of common overlaps and set on
  calendarEvents.forEach(function(calEvent) {
    calEvent.setLargestRow();
  });

  var sortedLargestRowByStartDate = calendarEvents.sort(function(a, b) {
    return b.largestRow.length - a.largestRow.length;
  });

  // set width for largest number event rows first
  sortedLargestRowByStartDate.forEach(function(calEvent) {
    calEvent.setWidth(W);
  });

  // set position/lefts
  sortedLargestRowByStartDate.forEach(function(calEvent) {
    calEvent.setPosition(W);
  });

  //apply offset for UI
  sortedLargestRowByStartDate.forEach(function(calEvent) {
    calEvent.applyOffset(75);
  });

  // render on display
  sortedLargestRowByStartDate.forEach(function(calEvent) {
    calEvent.plotEvent(calendar);
  });
}



// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
{start: 610, end: 670, a:'A'},
{start: 540, end: 600, a:'B'}, 
{start: 560, end: 620, a:'C'},
{start: 150, end: 600, a: 'D'},

{start: 190, end: 220},
{start: 100, end: 180},
{start: 90, end: 150},
{start: 90, end: 200}, 
];

renderTimes(calendar.elem);
layOutDay(events);
