import moment from 'moment'
export default function (value) {
  const now = moment();
  const time = moment(now.format('MM/DD/YYYY') + ' ' + value);
  if (time.isValid) {
    return time.format('HH:mm');
  }
  return value;
}
