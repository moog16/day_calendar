function Bucket() {
  this.events = [];
  this.leastNumberOfOverlaps;
}

Bucket.prototype.add = function(calEvent) {
  this.events.push(calEvent);
}

Bucket.prototype.setleastNumberOfOverlaps = function() {
  this.leastNumberOfOverlaps = this.events.length;
  //get least # of overlaps in the bucket.events
  for(var i=0; i<this.events.length; i++) {
    var calEvent = this.events[i];
    if(calEvent.overlappingEvents.length < this.leastNumberOfOverlaps) {
      this.leastNumberOfOverlaps = calEvent.overlappingEvents.length;
    }
  }
}