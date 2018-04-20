import moment from 'moment'
export default function (value, format) {
  moment.locale('he-IL');
  const date = value ? new Date(value) : undefined
  switch (format) {
    case 'localString':
      return moment(date).format('dddd DD.MM.YY h:mm')  
      break
    case 'fromNow':
      return fromNow(date)    
      break;
    default:
      if (!value) {
          return 'במהלך השבוע'
        }  
       return moment(date).format(format)    
      break  
  }
}
  

function fromNow(value) {
    if (value) {
        const momentObj = moment(value)
        const isPast = momentObj.isBefore(Date.now());
        if (isPast) {
            return 'עברה'
        }
        return momentObj.calendar(null, {
            sameDay: 'היום',
            nextDay: 'מחר',
            nextWeek: 'dddd',
            sameElse: 'D.M'
        });
    return 
  } else {
    return 'גמיש'
  }
}