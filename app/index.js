import clock from "clock";
import * as document from "document";
import {battery, charger } from "power";
import {formatHours, calculateHoursAngle, calculateX, calculateY, updateDay, updateMonth} from "../modules/dateAndTime.js";
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
const hours = clockAnimation.getElementById("hours");
const textHours = clockAnimation.getElementById("texthours");
const minutesHand = document.getElementById("minuteshand");
const textMinutes = minutesHand.getElementById("textminutes");
const minutes = minutesHand.getElementById("minutes");
const cb = document.getElementById("cb");

clock.ontick = (evt) => {
  const today = evt.date;
  const minute =  today.getMinutes();
  const hour = today.getHours();
  day.text = updateDay(today);
  month.text = updateMonth(today);
  hours.groupTransform.rotate.angle = calculateHoursAngle(today.getSeconds(), minute, hour); 
  textHours.text = formatHours(hour);
  textMinutes.text = minute;
  minutes.groupTransform.translate.x = calculateX(minute);
  minutes.groupTransform.translate.y = calculateY(minute);
  if(hour >= 18 || hour < 6) {
    cb.style.fill="white";
  }else {
    cb.style.fill="yellow";
  }
}


const magicBar = document.getElementById("magicbar");
const magicLevel = magicBar.getElementById("magiclevel");
battery.onchange = (evt)=> {
  const charge = battery.chargeLevel;
  magicLevel.width = charge;
}


