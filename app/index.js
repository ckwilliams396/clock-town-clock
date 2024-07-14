import clock from "clock";
import * as document from "document";
import {battery, charger } from "power";
import {calculateHoursAngle, updateDay, updateMonth} from "../modules/dateAndTime.js";
import { updatePowerFill } from "../modules/power.js";
import { HeartRateSensor } from "heart-rate";


const hr = document.getElementById("hr");
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hr.text = hrm.heartRate;
  });
  hrm.start();
}

// Update the clock every minute
clock.granularity = "seconds";

const day = document.getElementById("day"); 
const month = document.getElementById("month");
const clockAnimation = document.getElementById("clockanimation");
const clockId = clockAnimation.getElementById("hours");

clock.ontick = (evt) => {
  const today = evt.date; 
  day.text = updateDay(today);
  month.text = updateMonth(today);
  clockId.groupTransform.rotate.angle = calculateHoursAngle(today.getSeconds(), today.getMinutes(), today.getHours());
}

const power = document.getElementById("power");
battery.onchange = (evt)=> {
  const charge = battery.chargeLevel;
  power.text = `${charge}%`;
  power.style.fill = updatePowerFill(charge);
}


