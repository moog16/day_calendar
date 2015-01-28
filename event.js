function CalEvent(start, end, id) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.overlappingEvents = [];
  this.uniqOverlaps = 0;
  this.left;
};

CalEvent.prototype.createAndSetPosition = function(calendar, W) {
  var elem = this.elem;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  elem.style.width = this.width(W) + 'px';
  calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
}

CalEvent.prototype.isOverlapping = function(otherEvent) {
  var start = this.start;
  var otherStart = otherEvent.start;
  if(start >= otherStart && start <= otherEvent.end ||
     otherStart >= start && otherStart <= this.end) {
    return true;
  }
}

CalEvent.prototype.setLeft = function() {
}


// have the calEvent be aware of the other overlapping events 
// by the otherEvents into an array
CalEvent.prototype.setOverlappingEvents = function(calendarEvents) {
  for(var i=0; i<calendarEvents.length; i++) {
    var otherEvent = calendarEvents[i];
    if(otherEvent.id === this.id) {
      continue;
    } else if(this.isOverlapping(otherEvent)) {
      this.overlappingEvents.push(otherEvent);
    }
  }
}


CalEvent.prototype.setUniqOverlaps = function() {
  for(var i=0; i<this.overlappingEvents.length; i++) {
    var overlap = this.overlappingEvents[i];
    if(overlap.overlappingEvents.length > this.uniqOverlaps) {
      this.uniqOverlaps = overlap.overlappingEvents.length;
    }
  }
}

CalEvent.prototype.width = function(W) {
  return W/(this.uniqOverlaps+1);
}