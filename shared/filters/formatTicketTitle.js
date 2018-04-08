import categoriesTree from '../constants/categoriesTree'

export default function (ticket) {
  if (!ticket || !ticket.category)
    return 'טיוטת פנייה'

  const category = categoriesTree[ticket.category].self;
  const destination = ticket.details.destinationAlias
  return formatSentence(category.value, category.noun, ticket.elder.firstName, ticket.details.subject, destination)
}

function formatSentence(ticketType, categoryNoun, elderName, ticketSubject, destination){
  if (ticketType === 'MEDICAL')
    return `${categoryNoun} ${elderName} ל${destination}`;

  if (ticketType === 'SHOPPING')
    return `${categoryNoun} ${elderName} לקניית ${ticketSubject}`;

  if (ticketType === 'SOCIAL_AT_HOME')
    return `${categoryNoun} עם ${elderName}`

  if (ticketType === 'SOCIAL_ESCORT')
    return `${categoryNoun}${ticketSubject} עם ${elderName}`;

  return `${categoryNoun} ${ticketSubject} ל${elderName}`;
}


