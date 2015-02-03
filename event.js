function CalEvent(start, end, id, a) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.a = a; // delete
  this.title = 'Sample Item';
  this.location = 'Sample Location';
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.overlappingEvents = [];
  this.largestRow = [];
  this.position;
  this.width;
  this.left;
};

CalEvent.prototype.applyOffset = function(offset) {
  this.left += offset;
}

CalEvent.prototype._filterEventsWithPosition = function(W) {
  var filteredEvents = {
    availablePositions: range(this.largestRow.length),
    positionsOutstanding: [],
    totalWindowRemaining: W
  };
  
  this.largestRow.forEach(function(otherEvent) {
    if(otherEvent.position !== undefined) { // if there is a position assigned to it already
      filteredEvents.availablePositions.removePosition(otherEvent.position);
      filteredEvents.totalWindowRemaining -= otherEvent.width;
    } else {
      filteredEvents.positionsOutstanding.push(otherEvent);
    }
  });

  return filteredEvents;
}

CalEvent.prototype._filterEventsWithWidth = function(W) {
  // used only in setWidth()
  var filteredEvents = {
    lengthRemaining: W,
    remaining: []
  };

  this.largestRow.forEach(function(otherEvent) {
    if(otherEvent.width) {
      filteredEvents.lengthRemaining -= otherEvent.width;
    } else {
      filteredEvents.remaining.push(otherEvent);
    }
  });
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
  var title = document.createElement('h4');
  title.className = 'title';
  var location = document.createElement('h6');
  location.className = 'location';
  title.textContent = this.title;
  location.textContent = this.location;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  elem.style.left = this.left + 'px';
  elem.style.width = this.width + 'px';
  elem.appendChild(title);
  elem.appendChild(location);
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

CalEvent.prototype.setLargestRow = function() {
  // finds all largest common overlapping sets of an event
  // sets this array on the event as LargestRow
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
  this.largestRow = commonOverlaps([calEvent], calEvent.overlappingEvents);
}

CalEvent.prototype.setPosition = function(W) {
  var filteredEvents = this._filterEventsWithPosition(W);
  var availablePositions = filteredEvents.availablePositions;

  //must sort before by start and end times
  this.largestRow.sortByStartAndEndTimes();

  for(var i=0; i<this.largestRow.length; i++) {
    var calEvent = this.largestRow[i];
    if(calEvent.left === undefined) {
      calEvent.position = Math.min.apply(null, availablePositions);
      if(calEvent.position === 0) {
        availablePositions.removePosition(calEvent.position);

        calEvent.left = 0;
      } else {
        var previousPos = calEvent.position -1;
        var previousRowEvent = this.largestRow.findPos(previousPos);
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
  this.largestRow.forEach(function(evt) {
    if(!evt.width) {
      evt.width = remainingRowWidth/remainingColumns.length;
    }
  });
}