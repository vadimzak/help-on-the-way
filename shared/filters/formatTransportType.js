import TransportEnum from 'shared/constants/enums/TicketTransportType'
export default function formatTransportType(value) {
    if (TransportEnum[value]) {
        return TransportEnum[value].text
    }
    return ''
}