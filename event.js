function CalEvent(start, end) {
  this.start = start;
  this.end = end;
  this.top = start;
  this.height = end - start;
  this.elem = createDiv('calendar-event');
  this.index;
  this.left;
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
