function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

function range(n) {
  var range = [];
  for(var i=0; i<n; i++) {
    range.push(i);
  }
  return range;
}

Array.prototype.removePosition = function(p) {
  var positionNotFound = true;
  var i = 0;
  while(positionNotFound && i < this.length) {
    if(this[i] === p) {
      this.splice(i, 1);
      positionNotFound = false;
    }
    i++;
  }
}

function renderTimes(calendar) {
  var dayLength = 720; // in minutes; SAME AS HEIGHT
  var dayBegin = 540;
  var dayLayout = calendar.getElementsByClassName('calendar-day-layout')[0];

  calendar.insertBefore(createDiv('calendar-day-times'), calendar.firstChild);

  for(var i=0; i<=dayLength/30; i++) {
    var elem = createDiv('calendar-day-time');
    var minutes = dayBegin + i*30;
    var hours = minutes/60;
    var hour = Math.floor(hours%12) || '12';
    var minute = hours%1*60 || '00';
    var periodOfDay = minute !== 30 ? (minutes >= 720 ? 'pm' : 'am') : '';
    var time = hour + ':' + minute + periodOfDay;
    elem.textContent = time;
    elem.style.top = i*30+'px';
    document.getElementsByClassName('calendar-day-times')[0].appendChild(elem);
  }
}