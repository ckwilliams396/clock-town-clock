import clock from "clock";
import * as document from "document";
import {battery, charger } from "power";
import {updateClock, updateDay, updateMonth} from "../modules/dateAndTime.js";
import { updateDate } from "../modules/dateAndTime.js";
import { updatePowerFill } from "../modules/power.js";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";


const hr = document.getElementById("hr");
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hr.text = hrm.heartRate;
  });
  hrm.start();
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const time = document.getElementById("time");
const day = document.getElementById("day"); 
const month = document.getElementById("month");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  day.text = updateDay(evt);
  month.text = updateMonth(evt);
  time.text = updateClock(evt);
}

const power = document.getElementById("power");
console.log(battery.chargeLevel);
battery.onchange = (evt)=> {
  const charge = battery.chargeLevel;
  power.text = `${charge}%`;
  power.style.fill = updatePowerFill(charge);
}


