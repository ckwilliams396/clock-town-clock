import { preferences } from "user-settings";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


export function updateClock(tickEvent) {
    const today = tickEvent.date;
    const minutes = zeroPad(today.getMinutes());
    //const seconds = today.getSeconds();
    const hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
      } else {
        // 24h format
        hours = zeroPad(hours);
      }
    return `${hours}:${minutes}`;
}

export function updateDay(tickEvent) {
  const today = tickEvent.date;
  //const year = today.getFullYear();
  const day = today.getDate();
  return formatDay(day);
}

export function updateMonth(tickEvent) {
  const today = tickEvent.date;
  //const year = today.getFullYear();
  const month = today.getMonth();
  return months[month];
}

export function calculateHoursAngle(time) {
  //180 degrees/ 12 hours / 60 minutes 
}