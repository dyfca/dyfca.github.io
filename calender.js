monthNames = ["January", "Feburay", "March", "April", "May", "June", "July", "August", "September", "Octobor", "November", "December"];
daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
currentView = 0;
monthView = 0;
weekView = 1;
dayView = 2;
currentMonth = 1;
currentYear = 2008;
currentActive = -1;
weekNames = ["Sun", "Mon", "Tue", "Wes", "Thu", "Fri", "Sat"];

eventsData = {};
currentIndex = -1;
eventsData[20180205] = [{title: "Test", description: "test"}, {title: "Test2", description: "test2"}];


function saveEvent() {
  eventID = currentYear * 10000 + currentMonth * 100 + parseInt(currentActive);
  if (eventsData[eventID] === undefined)
    eventsData[eventID] = [];
  eventData = eventsData[eventID];
  form_title = document.getElementById("title").value;
  form_description = document.getElementById("description").value;
  alert(form_description);
  if (currentIndex < 0) {
    eventsData[eventID].push({title: form_title, description: form_description});
  } else {
    eventsData[eventID][currentIndex].title = form_title;
    eventsData[eventID][currentIndex].description = form_description;
  }
  renderEvent();
  $("#eventForm").modal('toggle');
}
function editEvent(index) {
  currentIndex = index;
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  if (index < 0) {
    $("#eventForm").modal();
    return;
  }
  eventID = currentYear * 10000 + currentMonth * 100 + parseInt(currentActive);
  eventData = eventsData[eventID];
  document.getElementById("title").value = eventData[index].title;
  document.getElementById("description").value = eventData[index].description;
  $("#eventForm").modal();
}

function renderEvent() {
  eventID = currentYear * 10000 + currentMonth * 100 + parseInt(currentActive);
  eventData = eventsData[eventID];
  res = "";
  if (eventData != undefined) {
    
    for (var i = 0; i < eventData.length; i++) {
      res += "<div class=\"event\" type=\"button\" onClick=\"editEvent(" + i + ")\">";
      res += "<div class=\"row\"><div class=\"col-md-7 title\"><span>" + eventData[i].title +"</span></div></div>";
      res += "<div class=\"row\"><div class=\"col-md-7 description\"><span>" + eventData[i].description +"</span></div></div>";
      res += "</div>"
    }
  }
  res += "<div class=\"event\" type=\"button\" onClick=\"editEvent(-1)\">";
  res += "<div class=\"row\"><div class=\"col-md-7 title\"><span>New</span></div></div>";
  res += "<div class=\"row\"><div class=\"col-md-7 description\"><span></span></div></div>";     
  document.getElementById("events").innerHTML = res;
}


function leapYear(year) {
  return year % 100 == 0 || year % 4 == 0; 
}


function becomeActive(item) {
  item.classList.add("active");
  document.getElementById("col_" + currentActive).classList.remove("active");
  currentActive = item.getAttribute("id").split("_")[1];
  renderEvent();
}


function render(month, year) {
  calendar = [];
  isSame = month === new Date().getMonth() && year === new Date().getFullYear();
  currentActive = isSame? new Date().getDate() : 1; 
  daysOfMonth[1] = 28;
  if (leapYear(year))
    daysOfMonth[1] = 29;
  startDay = new Date(year, month, 1).getDay();
  dayIndex = 1;
  res = "<div class=\"row\"><div class=\"col-md-1 weekdays\">" + weekNames.join("</div><div class=\"col-md-1 weekdays\">") + "</div></div>";
  var i;
  for (i = 0; i < startDay + daysOfMonth[month]; i++) {
    if (i < startDay) {
      calendar.push("");
    } else {
      calendar.push(i + 1 - startDay);
    }
  }
  while (i % 7) {
    calendar.push("");
    i++;
  }

  i = 0;
  while (i < calendar.length) {
    res += "<div class=\"row\">";
    for (j = 0; j < 7; j++) {
      if (calendar[i + j] === currentActive)
        res += "<div id=\"col_" + calendar[i + j] + "\" class=\"col-md-1 active\"  onClick=\"becomeActive(this)\">" + calendar[i + j] + "</div>";  
      else if (calendar[i + j] === "")
        res += "<div id=\"col_" + calendar[i + j] + "\" class=\"col-md-1\">" + calendar[i + j] + "</div>";
      else
        res += "<div id=\"col_" + calendar[i + j] + "\" class=\"col-md-1\" onClick=\"becomeActive(this)\">" + calendar[i + j] + "</div>"; 
    }
    res += "</div>";
    i += 7;
  }

  document.getElementById("days").innerHTML = res;
  document.getElementById("month-name").innerHTML = monthNames[month];
  document.getElementById("year-name").innerHTML = year;
}
function switchCalendar(next, month, year) {   
  month = month || ((next) ? ((currentMonth + 1) % 12) : ((currentMonth + 11) % 12)); 
  year = year || ((next && month === 0) ? currentYear + 1 : (!next && month === 11) ? currentYear - 1 : currentYear);
  currentMonth = month;
  currentYear = year;
  render(month, year);
  renderEvent();
}

function init() {
  document.getElementById("prev").setAttribute("onClick", "switchCalendar(false)");
  document.getElementById("next").setAttribute("onClick", "switchCalendar(true)");
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  switchCalendar(null, currentMonth, currentYear);

}