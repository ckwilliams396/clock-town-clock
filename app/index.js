import clock from "clock";
import * as document from "document";
import {battery, charger } from "power";
import {updateClock, updateDate} from "../modules/dateAndTime.js";
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
const currDate = document.getElementById("date"); 

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  currDate.text = updateDate(evt);
  time.text = updateClock(evt);
}

const power = document.getElementById("power");
console.log(battery.chargeLevel);
battery.onchange = (evt)=> {
  console.log(battery.chargeLevel);
  const charge = battery.chargeLevel;
  power.text = `${charge}%`;
  power.style.fill = updatePowerFill(charge);
}

