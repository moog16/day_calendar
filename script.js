function layOutDay(events) {
  var calendar = document.getElementById('calendar');
  var W = 600;

  function getCalendarEvents(events) {
    var calendarEvents = [];
    for(var i=0; i<events.length; i++) {
      var e = events[i];
      var id = Math.floor(new Date().valueOf()* Math.random());
      var calEvent = new CalEvent(e.start, e.end, id);
      calendarEvents.push(calEvent);
    }
    return calendarEvents;
  }

  function getSortedOverlaps(calendarEvents) {
    var sortedOverlaps = [];

    for(var i=0; i<calendarEvents.length; i++) {
      var calEvent = calendarEvents[i];
      calEvent.setOverlappingEvents(calendarEvents);

      // create sortedOverlaps which are buckets of calEvents
      // with the same number of overlappingEvents
      var index = calEvent.overlappingEvents.length;
      var sortedOverlapsBucket = sortedOverlaps[index];
      if(sortedOverlapsBucket && sortedOverlapsBucket.length) {
        sortedOverlapsBucket.push(calEvent);
      } else {
        sortedOverlaps[index] = [calEvent];
      }
    }
    return sortedOverlaps;
  }

  renderCalendar(calendar);

  var calendarEvents = getCalendarEvents(events);

  var sortedOverlaps = getSortedOverlaps(calendarEvents);


  // iterate over sortedOverlaps
  for(var i=0; i<sortedOverlaps.length; i++) {
    var bucket = sortedOverlaps[i];

    if(bucket && bucket.length) {
      for(var j=0; j<bucket.length; j++) {
        var calEvent = bucket[j];
        calEvent.setUniqOverlaps();
      }
    }
  }

  

  // render on display
  for(var i=0; i<calendarEvents.length; i++) {
    var calEvent = calendarEvents[i];
    calEvent.createAndSetPosition(calendar, W);
  }
  debugger;


}

function renderCalendar(calendar) {
  calendar.appendChild(createDiv('calendar-day-layout'));
  renderTimes(calendar);
}



// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
// {start: 150, end: 600}, 
{start: 560, end: 620},
{start: 540, end: 600}, 
{start: 90, end: 150},
{start: 90, end: 200}, 
{start: 610, end: 670} ];


layOutDay(events);
