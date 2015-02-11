function CalEvent(start, end) {
  this.id = Math.floor(new Date().valueOf()* Math.random());;
  this.start = start;
  this.end = end;
  this.title = 'Sample Item';
  this.location = 'Sample Location';
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.overlappingEvents = [];
  this.mostOverlappingEventsRow = [];
  this.position;
  this.width;
  this.left;
};

CalEvent.prototype.applyOffset = function(offset) {
  this.left += offset;
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
  return _.every(overlaps, function(overlap) {
    return this.isOverlapping(overlap);
  }, this);
}

CalEvent.prototype.plotEvent = function(calendar) {
  var elem = this.elem;
  var title = document.createElement('h4');
  var location = document.createElement('h6');
  title.className = 'title';
  location.className = 'location';
  title.textContent = this.title;
  location.textContent = this.location;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  elem.style.left = this.left + 'px';
  elem.style.width = this.width + 'px';
  elem.appendChild(title);
  elem.appendChild(location);
  calendar.elem.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
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

CalEvent.prototype.setMostOverlappingEventsRow = function() {
  // finds all overlapping events 
  // sets this array as mostOverlappingEventsRow
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
  this.mostOverlappingEventsRow = commonOverlaps([this], this.overlappingEvents);
}

CalEvent.prototype._getAvailablePositions = function(W) {
  var availablePositions = _.range(this.mostOverlappingEventsRow.length);
  
  _.each(this.mostOverlappingEventsRow, function(otherEvent) {
    if(otherEvent.position !== undefined) { // if there is a position assigned to it already
      availablePositions = _.without(availablePositions, otherEvent.position);
    }
  });

  return availablePositions
}

CalEvent.prototype.setPosition = function(W) {
  var availablePositions = this._getAvailablePositions(W);

  _.each(this.mostOverlappingEventsRow, function(calEvent, i, largestRow) {
    if(calEvent.left !== undefined) {
      return;
    }

    calEvent.position = _.min(availablePositions);
    if(calEvent.position === 0) {
      calEvent.left = 0;
    } else {
      var previousEventPos = calEvent.position - 1;
      var previousEventRow = _.find(largestRow, function(otherEvent) {
        return previousEventPos === otherEvent.position;
      });

      calEvent.left = previousEventRow.left + previousEventRow.width;
    }
    availablePositions = _.without(availablePositions, calEvent.position);
  });
}

CalEvent.prototype.setWidth = function(W) {
  var remainingRowWidth = _.reduce(this.mostOverlappingEventsRow, function(sum, otherEvent) {
    if(!otherEvent.width) {
      return sum;
    }
    return sum - otherEvent.width;
  }, W);

  var remainingColumns = _.filter(this.mostOverlappingEventsRow, function(otherEvent) {
    if(otherEvent.width) {
      return;
    }
    return otherEvent;
  });

  _.each(this.mostOverlappingEventsRow, function(evt) {
    if(evt.width) {
      return;
    }
    evt.width = remainingRowWidth/remainingColumns.length;
  });
}