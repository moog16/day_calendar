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

  renderCalendar(calendar);

  var calendarEvents = getCalendarEvents(events);
  //set overlapping events
  for(var i=0; i<calendarEvents.length; i++) {
    calendarEvents[i].setOverlappingEvents(calendarEvents);
  }
  var sortedCalendarEvents = calendarEvents.sort(function(a, b) {
    var startDiff = a.start - b.start;
    if(startDiff === 0) {
      return b.end - a.end;
    } else {
      return startDiff;
    }
  });

  // setup buckets of events that overlap eachother
  var buckets = [];

  for(var i=0; i<sortedCalendarEvents.length; i++) {
    var calEvent = sortedCalendarEvents[i];
    var bucket = new Bucket();
    bucket.add(calEvent);

    //loop over all over events 
    for(var j=0; j<sortedCalendarEvents.length; j++) {
      var otherEvent = sortedCalendarEvents[j];
      if(j !== i) {
        if(calEvent.isOverlapping(otherEvent)) {
          bucket.add(otherEvent);
        }
      }
    }
    buckets.push(bucket);
  }

  //loop over buckets and get calendar event with most overlaps
  for(var i=0; i<buckets.length; i++) {
    var bucket = buckets[i];
    var overlaps = bucket.events.length;
    bucket.setleastNumberOfOverlaps();
    
    // get wRatio for width calculation
    for(var j=0; j<bucket.events.length; j++) {
      var calEvent = bucket.events[j];
      if(!calEvent.wRatio || calEvent.wRatio > bucket.leastNumberOfOverlaps) {
        calEvent.wRatio = bucket.leastNumberOfOverlaps;
      }
    }

    var availablePos = range(bucket.leastNumberOfOverlaps);

    // set lefts & widths
    for(var j=0; j<bucket.events.length; j++) {
      var calEvent = bucket.events[j];
      if(calEvent.position === undefined) {
        calEvent.position = Math.min.apply(null, availablePos);
        availablePos.removePosition(calEvent.position);
        calEvent.left = calEvent.position * W/(calEvent.wRatio+1) + 75;
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
// {start: 560, end: 620},
// {start: 540, end: 600}, 
{start: 90, end: 150},
{start: 90, end: 200}, 
{start: 100, end: 180},
// {start: 190, end: 220},
// {start: 610, end: 670} 
];


layOutDay(events);
