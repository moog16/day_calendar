var calendar = new Calendar(600);
function layOutDay(events) {
  calendar.layOutDay(events);
}

// var events = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var events = [ 
{start: 610, end: 670},
{start: 190, end: 220},
{start: 100, end: 180},
{start: 560, end: 620},
{start: 90, end: 150},
{start: 540, end: 600}, 
{start: 90, end: 200}, 
];

renderTimes(calendar.elem);
layOutDay(events);
