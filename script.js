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

  for(var i=0; i<sortedCalendarEvents.length; i++) {
    var calEvent = sortedCalendarEvents[i];
    calEvent.setMaxOverlaps(); 
  }

  var sortedMaxOverlapsByStartDate = sortedCalendarEvents.sort(function(a,b) {
    return b.maxOverlaps.length - a.maxOverlaps.length;
  });

  // need to set width for largest rows, since 
  // largest row size will determine width
  for(var i=0; i<sortedMaxOverlapsByStartDate.length; i++) {
    var calEvent = sortedMaxOverlapsByStartDate[i];
    calEvent.setWidth(W);
  }

  debugger;





  //loop over buckets and get calendar event with most overlaps
  // for(var i=0; i<buckets.length; i++) {
  //   var bucket = buckets[i];
  //   var overlaps = bucket.events.length;
  //   bucket.setMaxNumberOfOverlaps();
    
  //   debugger;
    
  //   // get wRatio for width calculation
  //   for(var j=0; j<bucket.events.length; j++) {
  //     var calEvent = bucket.events[j];
  //     if(!calEvent.wRatio
  //       && calEvent.overlappingEvents.length <= bucket.maxNumberOfOverlaps) {
  //         calEvent.wRatio = bucket.maxNumberOfOverlaps;
  //     }
  //   }
  //   debugger;

  //   var availablePos = range(bucket.leastNumberOfOverlaps);

   

    // set lefts & widths
    // for(var j=0; j<bucket.events.length; j++) {
    //   var calEvent = bucket.events[j];
    //   debugger
    //   if(calEvent.position === undefined || bucket.leastNumberOfOverlaps > calEvent.wRatio) {
    //     calEvent.position = Math.min.apply(null, availablePos);

    //     availablePos.removePosition(calEvent.position);
    //     calEvent.left = calEvent.position * W/(calEvent.wRatio+1) + 75;
    //   }
    // }
  // }

  // render on display
  for(var i=0; i<sortedCalendarEvents.length; i++) {
    var calEvent = sortedCalendarEvents[i];
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
{start: 90, end: 150, a: 'B'},
{start: 90, end: 200, a: 'A'}, 
{start: 100, end: 180, a: 'C'},
{start: 190, end: 220, a: 'D'},
// {start: 610, end: 670} 
];


layOutDay(events);
