function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

function renderTimes(calendar) {
  // render the times on the left hand side
  var dayLength = 720; // in minutes; SAME AS HEIGHT
  var dayBegin = 540;
  var dayLayout = calendar.getElementsByClassName('calendar-day-layout')[0];
  function createPeriodOfDayElement(periodOfDay) {
    var periodOfDayElem = document.createElement('span');
    periodOfDayElem.className = 'period-of-day';
    periodOfDayElem.textContent = periodOfDay;
    return periodOfDayElem;
  }
  function createTimeElement(hour, minute) {
    var timeElem = document.createElement('span');
    if(minute !== 30) {
      timeElem.className = 'on-hour';
    }
    timeElem.textContent = hour + ':' + minute;
    return timeElem;
  }

  calendar.insertBefore(createDiv('calendar-day-times'), calendar.firstChild);

  for(var i=0; i<=dayLength/30; i++) {
    var elem = createDiv('calendar-day-time');
    var minutes = dayBegin + i*30;
    var hours = minutes/60;
    var hour = Math.floor(hours%12) || '12';
    var minute = hours%1*60 || '00';
    var periodOfDay = minute !== 30 ? (minutes >= 720 ? 'PM' : 'AM') : '';

    elem.style.top = i*30+'px';
    var timeSlot = document.getElementsByClassName('calendar-day-times')[0];
    elem.appendChild(createTimeElement(hour, minute));
    if(periodOfDay !== '') {
      elem.appendChild(createPeriodOfDayElement(periodOfDay));
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