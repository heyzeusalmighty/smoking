import LogData from './log-data.mjs';

const cleaner = () => {
  console.log('DELETING OLD RECORDS');
  LogData.clearOutDatabase();
};

cleaner();