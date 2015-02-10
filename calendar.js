function Calendar(events, W) {
  this.elem = document.getElementById('calendar');
  this.W = W;
  this.events = this.getSortedEvents(events);
  this.layout = createDiv('calendar-day-layout');
  this.elem.appendChild(this.layout);
}

Calendar.prototype.clearCalendar = function() {
  var layouts = document.getElementsByClassName('calendar-day-layout');
  if(layouts.length) {
    for(var i=0; i<layouts.length; i++) {
      this.elem.removeChild(layouts[i]);
    }
  }
}

Calendar.prototype.getSortedEvents = function(events) {
  return _.map(events, function(calEvent) {
    return new CalEvent(calEvent.start, calEvent.end, calEvent.a);        // todo: remove 'a'
  });
}

Calendar.prototype.renderTimes = function() {
  // render the times on the left hand side
  var dayLength = 720; // in minutes; SAME AS HEIGHT
  var dayBegin = 540;
  var dayLayout = this.layout;
  function createPeriodOfDayElement(periodOfDay) {
    var periodOfDayElem = document.createElement('span');
    periodOfDayElem.className = 'period-of-day';
    periodOfDayElem.textContent = periodOfDay;
    return periodOfDayElem;
  }
  function createTimeElement(hour, minute) {
    var timeElem = document.createElement('span');
    if(minute !== 30) {
      timeElem.className = 'on-hour';
    }
    timeElem.textContent = hour + ':' + minute;
    return timeElem;
  }

  this.elem.insertBefore(createDiv('calendar-day-times'), this.elem.firstChild);

  for(var i=0; i<=dayLength/30; i++) {
    var elem = createDiv('calendar-day-time');
    var minutes = dayBegin + i*30;
    var hours = minutes/60;
    var hour = Math.floor(hours%12) || '12';
    var minute = hours%1*60 || '00';
    var periodOfDay = minute !== 30 ? (minutes >= 720 ? 'PM' : 'AM') : '';

    elem.style.top = i*30+'px';
    var timeSlot = document.getElementsByClassName('calendar-day-times')[0];
    elem.appendChild(createTimeElement(hour, minute));
    if(periodOfDay !== '') {
      elem.appendChild(createPeriodOfDayElement(periodOfDay));
    }
    timeSlot.appendChild(elem);
  }
}

Calendar.prototype.setEventProperties = function() {
  var calendarEvents = this.events;

  this.clearCalendar();
    // sort by start and end times
  calendarEvents.sortByStartAndEndTimes();

  //set overlapping events
  _.each(calendarEvents, function(calEvent) {
    calEvent.setOverlappingEvents(calendarEvents);
  });

  // find largest array of common overlaps and set on
  _.each(calendarEvents, function(calEvent) {
    calEvent.setLargestRow();
  });

  this.sortedLargestRowByStartDate = calendarEvents.sort(function(a, b) {
    return b.largestRow.length - a.largestRow.length;
  });

  // set width for largest number event rows first
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.setWidth(this.W);
  });

  // set position/lefts
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.setPosition(this.W);
  });

  //apply offset for UI
  _.each(this.sortedLargestRowByStartDate, function(calEvent) {
    calEvent.applyLeftOffset(75);
  });
}