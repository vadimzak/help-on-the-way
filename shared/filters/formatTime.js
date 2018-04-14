import moment from 'moment'
export default function (value, ofDate) {
  const date = ofDate ? moment(ofDate) : moment();
  const time = moment(date.format('YYYY-MM-DD') + 'T' + value);
  if (time.isValid) {
    return time.format('HH:mm');
  }
  return value;
}
