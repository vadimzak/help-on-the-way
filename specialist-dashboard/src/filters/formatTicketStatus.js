import statusEnum from  '@/constants/enums/TicketStatus'
export default function (status = "") {
    status = status.toLowerCase()
    if (statusEnum[status]) {
        return  statusEnum[status].singleText
    }
    return status;
  }