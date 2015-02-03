function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

Array.prototype.findPos = function(p) {
  for(var i=0; i<this.length; i++) {
    if(this[i].position === p) {
      return this[i];
    }
  }
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
    var periodOfDay = minute !== 30 ? (minutes >= 720 ? 'PM' : 'AM') : '';
    var timeElem = document.createElement('span');
    if(minute !== 30) {
      timeElem.className = 'on-hour';
    }
    var periodOfDayElem = document.createElement('span');
    periodOfDayElem.className = 'period-of-day';
    timeElem.textContent = hour + ':' + minute;
    periodOfDayElem.textContent = periodOfDay
    elem.style.top = i*30+'px';
    var timeSlot = document.getElementsByClassName('calendar-day-times')[0];
    elem.appendChild(timeElem);
    if(periodOfDayElem.textContent !== '') {
      elem.appendChild(periodOfDayElem);
    }
    timeSlot.appendChild(elem);
  }
}

Array.prototype.sortByStartAndEndTimes = function() {
  this.sort(function(a, b) {
    var startDiff = a.start - b.start;
    if(startDiff === 0) {
      return b.end - a.end;
    } else {
      return startDiff;
    }
  });
}