import LogData from './log-data.mjs';
import { newTemperatureReading } from './websockets.mjs';

const FOOD_LINE = 'Temperature 1 (Food):';
const BBQ_LINE = 'Temperature 2 (Barbecue):';
const TEMP_DEFAULT = '320.0';


const convertTemp = temp => {
  if (temp === TEMP_DEFAULT || Number(temp) === 0) {
    return 0;
  }
  return Math.round((Number(temp) * 9/5) + 32);
}
  
const processData = data => {
  const string = data.toString();
  const allData = string.split('\n');

  let foodTemp = 0;
  let bbqTemp = 0;

  const hasFood = allData.filter(x => x.includes(FOOD_LINE));
  if (hasFood.length) {
    const splitted = hasFood[0].split(' ');
    foodTemp = convertTemp(splitted[3]);
  }

  const hasBbq = allData.filter(x => x.includes(BBQ_LINE));
  if (hasBbq.length) {
    const bbqSplit = hasBbq[0].split(' ');
    bbqTemp = convertTemp(bbqSplit[3]);
  }

  console.log(`Food Temp: ${foodTemp}`);
  console.log(`BBQ Temp: ${bbqTemp}`);
  console.log('===================================');

  // sometimes the unit will emit zeros for temps
  if (foodTemp !== 0 && bbqTemp !== 0) {
    const { timestamp } = LogData.logTempData(foodTemp, bbqTemp);
    newTemperatureReading({ food: foodTemp, bbq: bbqTemp, timestamp });
  }
};

export default processData;