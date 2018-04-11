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
       return moment(date).format(format)    
      break  
  }
}
  

function fromNow(value) {
  if (value) {
    return moment(value).toNow()
  } else {
    return 'גמיש'
  }
}