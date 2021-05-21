import { exec } from 'child_process';
import processData from './process-data.mjs';

const kickOffSdr = () => {
  const child = exec('sudo rtl_433 -R 97');

  // stdout
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', data => processData(data));

  // stderr
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', data => console.log('stderr: ' + data));

  child.on('close', code => console.log('closing code: ' + code));
};

export default kickOffSdr;