function CalEvent(start, end, id, a) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.a = a; // delete
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.overlappingEvents = [];
  this.maxOverlaps = [];
  this.width;
  this.position;
  this.left;
};

CalEvent.prototype.createAndSetPosition = function(calendar, W) {
  var elem = this.elem;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  elem.style.left = this.left + 'px';
  elem.style.width = this.width + 'px';
  calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
}

CalEvent.prototype._getSpotsTaken = function(W) {
  var spotsTaken = {
    lengthRemaining: W,
    remaining: []
  };
  
  for(var i=0; i<this.maxOverlaps.length; i++) {
    var otherEvent = this.maxOverlaps[i];
    if(otherEvent.width) {
      spotsTaken.lengthRemaining -= otherEvent.width;
    } else {
      spotsTaken.remaining.push(otherEvent);
    }
  }
  return spotsTaken;
}

CalEvent.prototype.isOverlapping = function(otherEvent) {
  var start = this.start;
  var otherStart = otherEvent.start;
  if(start >= otherStart && start <= otherEvent.end ||
     otherStart >= start && otherStart <= this.end) {
    return true;
  }
}

CalEvent.prototype.isOverlappingAll = function(overlaps) {
  for(var i=0; i<overlaps.length; i++) {
    if(!this.isOverlapping(overlaps[i])) {
      return false;
    }
  }
  return true;
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

CalEvent.prototype.setMaxOverlaps = function() {
  var calEvent = this;
  var commonOverlaps = function(overlaps, remainder) {
    for(var i=0; i<remainder.length; i++) {
      if(remainder[i].isOverlappingAll(overlaps)) {
        overlaps.push(remainder[i]);
        remainder.splice(i, 1);
        commonOverlaps(overlaps, remainder);
      }
    }

    return overlaps;
  }
  this.maxOverlaps = commonOverlaps([calEvent], calEvent.overlappingEvents);
}

CalEvent.prototype.setWidth = function(W) {
  var spotsTaken = this._getSpotsTaken(W);
  var remainingRowWidth = spotsTaken.lengthRemaining;
  var remainingColumns = spotsTaken.remaining
  for(var i=0; i<this.maxOverlaps.length; i++) {
    var evt = this.maxOverlaps[i];
    if(!evt.width) {
      evt.width = remainingRowWidth/remainingColumns.length;
    }
  }
}