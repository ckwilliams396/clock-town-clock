
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 180 degrees / 12 hours
const degreesPerHour = 180/15;
//180 degrees / 12 hours / 60 minutes
const degreesPerMinute = degreesPerHour/60;
const degreesPerSecond = degreesPerMinute/60;
const startHour = 6;


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
   return (seconds*degreesPerSecond) + (minutes*degreesPerMinute) + (degreesPerHour*((hours % 12 || 12)-startHour));
}