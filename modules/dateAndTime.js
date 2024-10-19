
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 180 degrees / 12 hours
const degreesPerHour = 180/12;
//180 degrees / 12 hours / 60 minutes
const degreesPerMinute = degreesPerHour/60;
const degreesPerSecond = degreesPerMinute/60;
const startHour = 6;
//Square is 25% x 25% which comes out to 75px x 75px. Using pythagorean theorem you get 106 to be the distance
//the circle has to travel in 30 minutes
const length = 106;
// length / 30 minute
const pxpm = 3.5;


//endsWith function throws an error
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatDay(day) {
  let strDay = day.toString();
  if (endsWith(strDay, "1") && day !== 11) {
    strDay = `${strDay}st`;
  }
  else if (endsWith(strDay, "2") && day !== 12) {
    strDay = `${strDay}nd`;
  }
  else if (endsWith(strDay, "3") && day !== 13) {
    strDay = `${strDay}rd`;
  }
  else {
    strDay = `${strDay}th`;
  }
  return strDay;
}

export function updateDay(today) {
  const day = today.getDate();
  return formatDay(day);
}

export function updateMonth(today) {
  const month = today.getMonth();
  return months[month];
}

export function calculateHoursAngle(seconds ,minutes, hours){  
  const angle = (seconds*degreesPerSecond) + (minutes*degreesPerMinute) + (degreesPerHour*((hours % 12 || 12)-startHour));
  if(angle < 0){
    return angle+180;
  }
   return angle;
}

export function formatHours(hours) {
  return hours % 12 || 12
}

export function calculateX(minutes){
  //106px / 30 minutes = 3.5px/m
  let x = 0;
  if(minutes < 15) {
    x = minutes * pxpm;
  }
  else if (minutes >= 15 && minutes < 30){
    x = length - ((minutes % 30) * pxpm);
  }
  else if(minutes >= 30 & minutes < 45) {
      x = -(minutes % 30) * pxpm;
  }
  else {
    x = ((minutes-60) % 30) * pxpm;
  }
  return x + 150;
}

export function calculateY(minutes) {
  let y = 0;
  if(minutes < 30) {
    y = minutes * pxpm;
  }
  else {
    y = length - ((minutes % 30) * pxpm);
  }
  return y + 290;
}