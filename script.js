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
  var buckets = [];  // buckets of events that overlap

  events = events.sort(function(eventA, eventB) {
    return eventA.start - eventB.start;
  });

  function createNewBucket(buckets, calEvent) {
    buckets.push({
      parentEvent: new CalEvent(calEvent.start, calEvent.end),
      events: [calEvent]
    });
  }

  for(var i=0; i<events.length; i++) {
    var e = events[i];
    var calEvent = new CalEvent(e.start, e.end);
    calEvent.createAndSetPosition(calendar);

    if(!buckets.length) {
      createNewBucket(buckets, calEvent);
    } else {
      var isSetInBucket = false;
      for(var j=0; j<buckets.length; j++) {
        var bucket = buckets[j];
        var parentEvent = bucket.parentEvent;
        if(calEvent.isOverlapping(parentEvent)) {
          isSetInBucket = true;
          bucket.events.push(calEvent);
          if(calEvent.start < parentEvent.start) {
            parentEvent.start = calEvent.start;
          }
          if(calEvent.end > parentEvent.end) {
            parentEvent.end = calEvent.end;
          }
        }
      }
      if(!isSetInBucket){
        createNewBucket(buckets, calEvent);
      }
    }
  }

  debugger;

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
