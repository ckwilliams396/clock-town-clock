import clock from "clock";
import * as document from "document";
import {battery, charger } from "power";
import {updateClock, updateDate} from "../modules/dateAndTime.js";




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

battery.onchange = (evt)=> {
  const charge = battery.chargeLevel;
  power.text = `${charge}%`;
  if(charge <= 50 && charge >= 25) {
    console.log("should be yellow");
  }else if(charge < 25) {
    console.log("should be red"); 
  }
}

