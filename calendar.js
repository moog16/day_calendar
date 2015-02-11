function Calendar(W) {
  this.elem = document.getElementById('calendar');
  this.W = W;
  this.events;
  this.sortedLargestRowByStartDate;
}

Calendar.prototype.clearCalendar = function() {
  var layouts = document.getElementsByClassName('calendar-day-layout');
  if(layouts.length) {
    for(var i=0; i<layouts.length; i++) {
      calendar.elem.removeChild(layouts[i]);
    }
  }
}

Calendar.prototype.render = function() {
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.plotEvent(calendar);
  });
}

Calendar.prototype.layOutDay = function(events) {
  this.setCalendarEventsAndSort(events);
  this.clearCalendar();
  this.elem.appendChild(createDiv('calendar-day-layout'));

  _.each(this.events, function(calEvent, i , allEvents) {
    calEvent.setOverlappingEvents(allEvents);
  });

  // find largest array of common overlaps and set on calEvent
  _.each(this.events, function(calEvent) {
    calEvent.setMostOverlappingEventsRow();
  });

  this.sortedLargestRowByStartDate = this.events.sort(function(a, b) {
    return b.mostOverlappingEventsRow.length - a.mostOverlappingEventsRow.length;
  });

  this.setWidthsForEvents();
  this.setPositionsForEvents();
  this.render();
}

Calendar.prototype.setCalendarEventsAndSort = function(events) {
  var calendarEvents = _.map(events, function(event) {
    return new CalEvent(event.start, event.end);
  });
  this.events = calendarEvents;
  // sort by start and end times
  this.events.sortByStartAndEndTimes();
}

Calendar.prototype.setWidthsForEvents = function() {
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.setWidth(this.W);
  }, this);
}

Calendar.prototype.setPositionsForEvents = function() {
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.setPosition(this.W);
  }, this);
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.applyOffset(75);
  });
}

