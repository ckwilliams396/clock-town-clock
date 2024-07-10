

export function updatePowerFill(charge) {
    if(charge <= 50 && charge >= 25) {
        return "yellow";
      }else if(charge < 25) {
        return "red";
      }else {
        return "green";
      }
}