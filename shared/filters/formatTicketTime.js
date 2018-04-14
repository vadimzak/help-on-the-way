import formatTime from './formatTime'
import flexibleTime from 'shared/constants/enums/FlexibleTime'

export default function formatTicketTime(ticket) {
    if (ticket.dueTime) {
        return formatTime(ticket.dueTime, ticket.dueDate)
    }
    if (ticket.details && ticket.details.flexibleTime) {
        const timeObj = flexibleTime[ticket.details.flexibleTime]
        return timeObj ? timeObj.text : 'ערך לא תקין'
    }
    return 'טרם נקבע'
}
