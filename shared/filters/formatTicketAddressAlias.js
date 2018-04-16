export default function(ticket, address){
    let alias = ''
    switch(address){
        case 'start':
            alias = (ticket.details.startAddressAlias || 'איסוף')
            break;
        case 'destination':
            alias = (ticket.details.destinationAddressAlias || 'יעד')
            break;
        case 'end':
            alias = (ticket.details.endAddressAlias || 'חזרה')
            break;
    }
    return alias;
}