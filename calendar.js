function Calendar(W) {
  this.elem = document.getElementById('calendar');
  this.events;
  
}

Calendar.prototype.clearCalendar = function() {
  var layouts = document.getElementsByClassName('calendar-day-layout');
  if(layouts.length) {
    for(var i=0; i<layouts.length; i++) {
      calendar.elem.removeChild(layouts[i]);
    }
  }
}


Calendar.prototype.setCalendarEventsAndSort = function(events) {
  var calendarEvents = _.map(events, function(event) {
    return new CalEvent(event.start, event.end);
  });
  this.events = calendarEvents;
  this.events.sortByStartAndEndTimes();
}



