function CalEvent(start, end, id) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.width;
  this.left;
  this.overlappingEvents = [];
};

CalEvent.prototype.isOverlapping = function(otherEvent) {
  var start = this.start;
  var otherStart = otherEvent.start;
  if(start >= otherStart && start <= otherEvent.end ||
     otherStart >= start && otherStart <= this.end) {
    return true;
  }
}


CalEvent.prototype.createAndSetPosition = function(calendar) {
  var elem = this.elem;
  elem.style.height = this.height + 'px';
  elem.style.top = this.top + 'px';
  calendar.getElementsByClassName('calendar-day-layout')[0].appendChild(elem);
}
