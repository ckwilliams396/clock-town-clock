import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import {battery, charger } from "power";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const time = document.getElementById("time");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(today.getMinutes());
  let secs = zeroPad(today)
  time.text = `${hours}:${mins}`;
}

const power = document.getElementById("power");

battery.onchange = (evt)=> {
  power.text = `${battery.chargeLevel}%`;
}

