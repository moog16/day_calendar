function Bucket() {
  this.events = [];
  this.maxNumberOfOverlaps;
}

Bucket.prototype.add = function(calEvent) {
  this.events.push(calEvent);
}
