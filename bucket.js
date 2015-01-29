function Bucket() {
  this.events = [];
  this.leastNumberOfOverlaps = this.events.length;
}

Bucket.prototype.add = function(calEvent) {
  this.events.push(calEvent);
}