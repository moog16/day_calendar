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
  this.position;
  this.width;
  this.left;
};

CalEvent.prototype.applyOffset = function(offset) {
  this.left += offset;
}

CalEvent.prototype._filterEventsWithPosition = function(W) {
  var filteredEvents = {
    availablePositions: range(this.maxOverlaps.length),
    positionsOutstanding: [],
    totalWindowRemaining: W
  };
  
  for(var i=0; i<this.maxOverlaps.length; i++) {
    var otherEvent = this.maxOverlaps[i];
    if(otherEvent.position !== undefined) { // if there is a position assigned to it already
      filteredEvents.availablePositions.removePosition(otherEvent.position);
      filteredEvents.totalWindowRemaining -= otherEvent.width;
    } else {
      filteredEvents.positionsOutstanding.push(otherEvent);
    }
  }
  return filteredEvents;
}

CalEvent.prototype._filterEventsWithWidth = function(W) {
  // used only in setWidth()
  var filteredEvents = {
    lengthRemaining: W,
    remaining: []
  };
  
  for(var i=0; i<this.maxOverlaps.length; i++) {
    var otherEvent = this.maxOverlaps[i];
    if(otherEvent.width) {
      filteredEvents.lengthRemaining -= otherEvent.width;
    } else {
      filteredEvents.remaining.push(otherEvent);
    }
  }
  return filteredEvents;
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

CalEvent.prototype.plotEvent = function(calendar) {
  var elem = this.elem;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  elem.style.left = this.left + 'px';
  elem.style.width = this.width + 'px';
  calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
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
  // finds all largest common overlapping sets of an event
  // sets this array on the event as maxOverlaps
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

CalEvent.prototype.setPosition = function(W) {
  var filteredEvents = this._filterEventsWithPosition(W);
  var availablePositions = filteredEvents.availablePositions;

  //must sort before by start and end times
  this.maxOverlaps.sortByStartAndEndTimes();

  for(var i=0; i<this.maxOverlaps.length; i++) {
    var calEvent = this.maxOverlaps[i];
    if(calEvent.left === undefined) {
      calEvent.position = Math.min.apply(null, availablePositions);
      if(calEvent.position === 0) {
        availablePositions.removePosition(calEvent.position);

        calEvent.left = 0;
      } else {
        var previousPos = calEvent.position -1;
        var previousRowEvent = this.maxOverlaps.findPos(previousPos);
        availablePositions.removePosition(calEvent.position);

        calEvent.left = previousRowEvent.left + previousRowEvent.width;
      }
    }
  }
}


CalEvent.prototype.setWidth = function(W) {
  var filteredEvents = this._filterEventsWithWidth(W);
  var remainingRowWidth = filteredEvents.lengthRemaining;
  var remainingColumns = filteredEvents.remaining
  for(var i=0; i<this.maxOverlaps.length; i++) {
    var evt = this.maxOverlaps[i];
    if(!evt.width) {
      evt.width = remainingRowWidth/remainingColumns.length;
    }
  }
}