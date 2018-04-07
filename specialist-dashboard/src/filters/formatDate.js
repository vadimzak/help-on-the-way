import moment from 'moment'
export default function (value) {
    if (value) {
      let date = new Date(value);
      return moment(date).toNow()
    } else {
      return 'גמיש'
    }
  }